import useForumDetail from "../hooks/useForumDetail";


const ForumDetail = ({ foroId, onClose }) => {
  const { foro, loading, error } = useForumDetail(foroId);

  if (!foroId) return null;
  if (loading) return <p>Cargando foro...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!foro) return <p>No se encontró el foro.</p>;

  return (
    <div>
      <h2>{foro?.titulo || "Foro sin título"}</h2>
      <p>{foro?.descripcion || "Sin descripción"}</p>
      <p><strong>Creador:</strong> {foro?.creador?.nombre || foro?.usuario_nombre || "Desconocido"}</p>
      {/* Aquí puedes agregar la lógica para mostrar comentarios si lo deseas */}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ForumDetail;
