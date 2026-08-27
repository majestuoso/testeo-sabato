--  Eliminar la opinion 
DELETE FROM opinion WHERE libro_id = 1;

-- Luego sí podés eliminar el libro
DELETE FROM libro WHERE libro_id = 1;
