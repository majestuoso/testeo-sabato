--  Marcar un usuario como perfil completo
UPDATE usuario
SET perfil_completo = TRUE
WHERE usuario_id = 2;

--  Actualizar el comentario y la calificación de una opinión existente
UPDATE opinion
SET
    comentario = 'Una obra maestra, aunque es una lectura densa.',
    calificacion = 4
WHERE opinion_id = 3;

-- Cambiar el rol de un usuario (por ejemplo, de 'alumno' a 'docente')
UPDATE usuario
SET rol = 'docente'
WHERE usuario_id = 4;

--  Actualizar la portada de un libro
UPDATE libro
SET portada_url = 'https://nuevaurl.com/portadas/nueva.jpg'
WHERE libro_id = 5;

-- Modificar la fecha de ingreso de un usuario a un club de lectura
UPDATE usuario_club_lectura
SET fecha_ingreso = '2025-10-15'
WHERE usuario_id = 2 AND club_id = 1;

--  Cambiar la descripción de una medalla
UPDATE medalla
SET descripcion = 'Por haber participado activamente en 10 clubes de lectura.'
WHERE medalla_id = 4;

-- Cambiar el estado de una exportación fallida
UPDATE exportacion
SET estado = 'completado', cantidad_opiniones_exportadas = 180
WHERE exportacion_id = 3;

