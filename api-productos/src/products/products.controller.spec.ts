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
      const createProductDto: CreateProductDto = {
        nombre: 'Test Product',
        precio: 100,
        stock: 10,
      };
      const expectedProduct = { id: 'some-uuid', ...createProductDto };
      mockProductsService.create.mockReturnValue(expectedProduct);

      const result = await controller.create(createProductDto);

      expect(result).toEqual(expectedProduct);
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const productId = 'some-uuid';
      const expectedProduct = {
        id: productId,
        nombre: 'Test Product',
        precio: 100,
        stock: 10,
      };
      mockProductsService.findOne.mockReturnValue(expectedProduct);

      const result = await controller.findOne(productId);

      expect(result).toEqual(expectedProduct);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(productId);
    });
  });
});
