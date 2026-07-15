function ProjectRow({ project, onDelete }) {
    return (
        <tr>
            <td>{project.title}</td>
            <td>{project.category}</td>
            <td>{project.status}</td>

            <td>
                <button>Edit</button>

                <button onClick={() => onDelete(project.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default ProjectRow;