-- Creación de la base de datos 
CREATE DATABASE TiendaRopa;
USE TiendaRopa;

-- Tabla Marca
CREATE TABLE Marca (
    ID_Marca INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL,
    Descripción VARCHAR(70),
    País_de_origen VARCHAR(20),
    Categoría VARCHAR(20),
    Contacto VARCHAR(30)
);

-- Tabla Prenda
CREATE TABLE Prenda (
    ID_Prenda INT AUTO_INCREMENT PRIMARY KEY,
    ID_Marca INT,
    Tipo_de_prenda VARCHAR(20) NOT NULL,
    Material VARCHAR(20),
    Talla VARCHAR(5),
    Color VARCHAR(20),
    Precio DECIMAL(6, 2) NOT NULL,
    Stock INT DEFAULT 0,
    FOREIGN KEY (ID_Marca) REFERENCES Marca(ID_Marca)
);

-- Tabla Ventas
CREATE TABLE Ventas (
    ID_venta INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Metodo_pago VARCHAR(30),
    Total_venta DECIMAL(6, 2)
);

-- Tabla Detalle_Venta (tabla intermedia para evitar relación muchos a muchos entre Ventas y Prenda)
CREATE TABLE Detalle_Venta (
    ID_detalle INT AUTO_INCREMENT PRIMARY KEY,
    ID_prenda INT NOT NULL,
    ID_venta INT NOT NULL,
    Cantidad INT NOT NULL,
    Subtotal DECIMAL(6, 2),
    FOREIGN KEY (ID_prenda) REFERENCES Prenda(ID_Prenda),
    FOREIGN KEY (ID_venta) REFERENCES Ventas(ID_venta)
);

-- Tabla Tokens (para gestionar la seguridad del API)
CREATE TABLE tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRIGGERS para mantener la consistencia de los valores de la tabla ventas y detalles ventas
DELIMITER $$

CREATE TRIGGER ActualizarTotalVenta
AFTER INSERT ON Detalle_Venta
FOR EACH ROW
BEGIN
    UPDATE Ventas
    SET Total_venta = (
        SELECT SUM(Subtotal)
        FROM Detalle_Venta
        WHERE ID_venta = NEW.ID_venta
    )
    WHERE ID_venta = NEW.ID_venta;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER ActualizarTotalVentaUpdate
AFTER UPDATE ON Detalle_Venta
FOR EACH ROW
BEGIN
    -- Recalcula para la venta anterior (si cambió el ID_venta)
    IF OLD.ID_venta != NEW.ID_venta THEN
        UPDATE Ventas
        SET Total_venta = (
            SELECT SUM(Subtotal)
            FROM Detalle_Venta
            WHERE ID_venta = OLD.ID_venta
        )
        WHERE ID_venta = OLD.ID_venta;
    END IF;

    -- Recalcula para la venta actual
    UPDATE Ventas
    SET Total_venta = (
        SELECT SUM(Subtotal)
        FROM Detalle_Venta
        WHERE ID_venta = NEW.ID_venta
    )
    WHERE ID_venta = NEW.ID_venta;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER ActualizarTotalVentaDelete
AFTER DELETE ON Detalle_Venta
FOR EACH ROW
BEGIN
    UPDATE Ventas
    SET Total_venta = (
        SELECT SUM(Subtotal)
        FROM Detalle_Venta
        WHERE ID_venta = OLD.ID_venta
    )
    WHERE ID_venta = OLD.ID_venta;
END $$

DELIMITER ;

USE TiendaRopa;
-- Insertar datos en la tabla Marca
INSERT INTO Marca (Nombre, Descripción, País_de_origen, Categoría, Contacto)
VALUES
('Nike', 'Marca de ropa deportiva y accesorios', 'EE.UU.', 'Deportiva', 'contact@nike.com'),
('Adidas', 'Marca de calzado y ropa deportiva', 'Alemania', 'Deportiva', 'info@adidas.com'),
('Zara', 'Ropa de moda y accesorios', 'España', 'Casual', 'zara@zara.com'),
('H&M', 'Ropa de moda a precios asequibles', 'Suecia', 'Casual', 'support@hm.com'),
('Levis', 'Ropa de mezclilla y jeans', 'EE.UU.', 'Casual', 'levis@levis.com');

-- Insertar datos en la tabla Prenda
INSERT INTO Prenda (ID_Marca, Tipo_de_prenda, Material, Talla, Color, Precio, Stock)
VALUES
(1, 'Camiseta', 'Algodón', 'M', 'Blanco', 19.99, 50),
(2, 'Zapatillas', 'Sintético', '42', 'Negro', 59.99, 30),
(3, 'Chaqueta', 'Poliéster', 'L', 'Azul', 79.99, 20),
(4, 'Vestido', 'Seda', 'S', 'Rojo', 49.99, 15),
(5, 'Jeans', 'Denim', '32', 'Azul', 39.99, 25);

-- Insertar datos en la tabla Ventas
INSERT INTO Ventas (Fecha_venta, Metodo_pago, Total_venta)
VALUES
('2024-10-05 10:30:00', 'Tarjeta de crédito', 39.98),
('2024-10-06 14:15:00', 'Efectivo', 59.99),
('2024-10-07 11:00:00', 'PayPal', 79.99),
('2024-10-08 09:45:00', 'Tarjeta de débito', 49.99),
('2024-10-08 16:20:00', 'Transferencia bancaria', 119.97);

-- Insertar datos en la tabla Detalle_Venta
INSERT INTO Detalle_Venta (ID_prenda, ID_venta, Cantidad, Subtotal)
VALUES
(1, 1, 2, 39.98),  -- 2 Camisetas en la venta 1
(2, 2, 1, 59.99),  -- 1 Par de zapatos en la venta 2
(3, 3, 1, 79.99),  -- 1 Chaqueta en la venta 3
(4, 4, 1, 49.99),  -- 1 Vestido en la venta 3
(5, 5, 3, 119.97); -- 3 Jeans en la venta 5

-- Insertar datos en la tabla Tokens (para generar tokens de seguridad)
INSERT INTO tokens (token, expires_at) VALUES
('d3b07384d113edec49eaa6238ad5ff00', '2024-12-10 12:00:00'),
('6f1ed002ab5595859014ebf0951522d9', '2024-12-11 12:00:00'),
('c4ca4238a0b923820dcc509a6f75849b', '2024-12-12 12:00:00'),
('98f13708210194c475687be6106a3b84', '2024-12-13 12:00:00'),
('3c59dc048e885024e6b0a1c72b1b6d1f', '2024-12-14 12:00:00'),
('aab3238922bcc25a6f606eb525ffdc56', '2024-12-15 12:00:00'),
('7c222fb2927d828af22f592134e893a', '2024-12-16 12:00:00'),
('16a7b23f2a6b9b27a94f374c96a9b70', '2024-12-17 12:00:00'),
('2d2d1fe74f529f8bc7fbc946bde5cd7', '2024-12-18 12:00:00'),
('0cc175b9c0f1b6a831c399e269772661', '2024-12-19 12:00:00');


-- Eliminación de algún dato (eliminar una prenda)
DELETE FROM detalle_venta WHERE `detalle_venta`.`ID_detalle` = 3
DELETE FROM prenda WHERE `prenda`.`ID_Prenda` = 3

-- Actualización de algún dato (actualizar el stock de una prenda)
UPDATE prenda SET stock = 25 WHERE ID_Prenda = 2;


-- Obtener la cantidad vendida de prendas por fecha específica
SELECT P.Tipo_de_prenda, SUM(DV.Cantidad) AS Cantidad_vendida, V.Fecha_venta
FROM Detalle_Venta DV
JOIN Prenda P ON DV.ID_prenda = P.ID_Prenda
JOIN Ventas V ON DV.ID_venta = V.ID_venta
WHERE DATE(V.Fecha_venta) = '2024-10-08'  -- Filtrar por la fecha que desees
GROUP BY P.Tipo_de_prenda, V.Fecha_venta;


-- Crear vista para obtener todas las marcas que tienen al menos una venta
CREATE VIEW MarcasConVentas AS
SELECT M.Nombre, SUM(DV.Cantidad) AS Cantidad_vendida
FROM Marca M
JOIN Prenda P ON M.ID_Marca = P.ID_Marca
JOIN Detalle_Venta DV ON P.ID_Prenda = DV.ID_prenda
GROUP BY M.Nombre
HAVING SUM(DV.Cantidad) > 0;


-- Crear vista para obtener las prendas vendidas y su cantidad restante en stock
CREATE VIEW PrendasVendidasYStock AS
SELECT P.Tipo_de_prenda, SUM(DV.Cantidad) AS Cantidad_vendida, P.Stock
FROM Prenda P
JOIN Detalle_Venta DV ON P.ID_Prenda = DV.ID_prenda
GROUP BY P.Tipo_de_prenda, P.Stock;


-- Crear vista para obtener las 5 marcas más vendidas y la cantidad de ventas
CREATE VIEW Top5MarcasVendidas AS
SELECT M.Nombre AS Marca, SUM(DV.Cantidad) AS Total_vendido
FROM Marca M
JOIN Prenda P ON M.ID_Marca = P.ID_Marca
JOIN Detalle_Venta DV ON P.ID_Prenda = DV.ID_prenda
GROUP BY M.Nombre
ORDER BY Total_vendido DESC
LIMIT 5;
