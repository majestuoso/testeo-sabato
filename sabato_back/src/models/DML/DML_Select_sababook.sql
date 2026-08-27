-- Seleccionar todos los libros
SELECT * FROM libro;

-- Seleccionar el nombre y email de todos los usuarios con rol de 'docente'
SELECT nombre, email FROM usuario WHERE rol = 'docente';

-- Obtener el título del libro y el comentario de la opinión para un libro específico
SELECT L.titulo, O.comentario, O.calificacion
FROM opinion AS O
JOIN libro AS L ON O.libro_id = L.libro_id
WHERE L.titulo = 'Fahrenheit 451';  

-- Listar todos los libros con sus autores y nivel educativo
SELECT
    libro_id,
    titulo,
    autor,
    genero,
    nivel_educativo
FROM
    libro
ORDER BY
    titulo;

-- Buscar libro por título o autor
SELECT
    libro_id,
    titulo,
    autor
FROM
    libro
WHERE
    titulo ILIKE 'El principito%'
    OR autor ILIKE '% Antoine de Saint- Exupéry%';  

-- Obtener la lista de usuarios con su rol
SELECT
    usuario_id,
    nombre,
    email,
    rol,
    fecha_registro
FROM
    usuario
ORDER BY
    fecha_registro DESC;

-- Contar cantidad de usuarios por su rol
SELECT
    rol,
    COUNT(*) AS cantidad_usuarios
FROM
    usuario
GROUP BY
    rol;

-- Listar los 10 libros mejor calificados
SELECT
    L.titulo,
    AVG(O.calificacion) AS calificacion_promedio
FROM
    libro AS L
JOIN
    opinion AS O ON L.libro_id = O.libro_id
GROUP BY
    L.libro_id, L.titulo
ORDER BY
    calificacion_promedio DESC
LIMIT 10;

-- Obtener calificación promedio de un libro específico (ej. libro_id = 1)
SELECT
    AVG(calificacion) AS calificacion_promedio
FROM
    opinion
WHERE
    libro_id = 1;

-- Ver todas las opiniones de un libro con el nombre de usuario (ej. libro_id = 2)
SELECT
    U.nombre AS nombre_usuario,
    O.calificacion,
    O.comentario,
    O.fecha
FROM
    opinion AS O
JOIN
    usuario AS U ON O.usuario_id = U.usuario_id
WHERE
    O.libro_id = 2
ORDER BY
    O.fecha DESC;

-- Obtener todos los comentarios de un foro específico (ej. foro_id = 1)
SELECT
    U.nombre AS nombre_usuario,
    CF.contenido,
    CF.fecha
FROM
    comentario_foro AS CF
JOIN
    usuario AS U ON CF.usuario_id = U.usuario_id
WHERE
    CF.foro_id = 1
ORDER BY
    CF.fecha;

-- Ver miembros de un club de lectura (ej. club_id = 1)
SELECT
    U.nombre AS nombre_usuario,
    UCL.rol_en_club,
    UCL.fecha_ingreso
FROM
    usuario_club_lectura AS UCL
JOIN
    usuario AS U ON UCL.usuario_id = U.usuario_id
WHERE
    UCL.club_id = 1;

-- Ver todas las medallas obtenidas por un usuario (ej. usuario_id = 1)
SELECT
    M.nombre,
    M.descripcion,
    UM.fecha_obtenida
FROM
    usuario_medalla AS UM
JOIN
    medalla AS M ON UM.medalla_id = M.medalla_id
WHERE
    UM.usuario_id = 1
ORDER BY
    UM.fecha_obtenida DESC;

-- Contar cantidad total de opiniones exportadas por un administrador (ej. usuario_admin_id = 3)
SELECT
    SUM(cantidad_opiniones_exportadas) AS total_opiniones_exportadas
FROM
    exportacion
WHERE
    usuario_admin_id = 3;

-- Obtener todos los libros con calificación promedio (basado en opiniones)
SELECT
    L.titulo,
    L.autor,
    AVG(O.calificacion) AS calificacion_promedio
FROM
    libro AS L
JOIN
    opinion AS O ON L.libro_id = O.libro_id
GROUP BY
    L.libro_id, L.titulo, L.autor;

-- Obtener todos los usuarios que no han completado su perfil
SELECT nombre, email
FROM usuario
WHERE perfil_completo = FALSE;

-- Obtener todos los comentarios de un foro específico con el nombre del usuario (foro_id = 1)
SELECT
    U.nombre AS nombre_usuario,
    CF.contenido,
    CF.fecha
FROM
    comentario_foro AS CF
JOIN
    usuario AS U ON CF.usuario_id = U.usuario_id
WHERE
    CF.foro_id = 1;

