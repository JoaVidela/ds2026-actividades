interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerusuarios(): Promise<Usuario[]>  {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const usuarios: Usuario[] = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return [];
    }
}

obtenerusuarios().then(usuarios => {
    console.log('Usuarios obtenidos:', usuarios);
    usuarios.forEach(usuario => {
        console.log(`ID: ${usuario.id} | Nombre: ${usuario.name} | Email: ${usuario.email} | Teléfono: ${usuario.phone}`);
    });
});
