import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

// 1. Creamos un objeto que simula nuestro ProductsService
const mockProductsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      // 2. En lugar del ProductsService real, proveemos nuestro mock.
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 3. Escribimos pruebas para el controlador, verificando que llame al servicio.
  describe('create', () => {
    it('should create a product', async () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        nombre: 'Test Product',
        precio: 100,
        stock: 10,
      };
      const expectedProduct = { id: 'some-uuid', ...createProductDto };

      // Configuramos el mock para que devuelva un valor cuando se llame a su método 'create'
      mockProductsService.create.mockReturnValue(expectedProduct);

      // Act
      const result = await controller.create(createProductDto);

      // Assert
      expect(result).toEqual(expectedProduct);
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      // Arrange
      const productId = 'some-uuid';
      const expectedProduct = {
        id: productId,
        nombre: 'Test Product',
        precio: 100,
        stock: 10,
      };
      mockProductsService.findOne.mockReturnValue(expectedProduct);

      // Act
      const result = await controller.findOne(productId);

      // Assert
      expect(result).toEqual(expectedProduct);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(productId);
    });
  });
});
/*
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

// CAMBIO 1: Definimos un tipo explícito en lugar del genérico con "Partial".
// Este tipo describe exactamente las funciones que nuestro mock tendrá.
type MockProductRepository = Record<
  keyof Pick<
    Repository<Product>,
    'findOneBy' | 'find' | 'create' | 'save' | 'preload' | 'remove'
  >,
  jest.Mock
>;

// 2. La factory ahora crea un objeto que coincide con el tipo explícito.
const createMockRepository = (): MockProductRepository => ({
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
});

describe('ProductsService', () => {
  let service: ProductsService;
  // CAMBIO 2: Usamos nuestro nuevo tipo, más preciso.
  let productRepository: MockProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    // CAMBIO 3: Obtenemos la dependencia con el tipo correcto.
    productRepository = module.get<MockProductRepository>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find a product by ID', async () => {
      const mockProduct = {
        id: 'some-uuid',
        nombre: 'Test Product',
        precio: 10,
        stock: 100,
      };
      // Ahora TypeScript sabe que "findOneBy" siempre existe en nuestro mock.
      productRepository.findOneBy.mockReturnValue(mockProduct);

      const result = await service.findOne('some-uuid');

      expect(result).toEqual(mockProduct);
      expect(productRepository.findOneBy).toHaveBeenCalledWith({
        id: 'some-uuid',
      });
    });

    it('should throw a NotFoundException if product does not exist', async () => {
      productRepository.findOneBy.mockReturnValue(null);
      await expect(service.findOne('non-existent-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and save a new product', async () => {
      const createProductDto = {
        nombre: 'New Product',
        precio: 20,
        stock: 50,
      };
      const expectedProduct = { id: 'new-uuid', ...createProductDto };

      productRepository.create.mockReturnValue(createProductDto);
      productRepository.save.mockReturnValue(expectedProduct);

      const result = await service.create(createProductDto);

      expect(result).toEqual(expectedProduct);
      expect(productRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(productRepository.save).toHaveBeenCalledWith(createProductDto);
    });
  });
});
*/
