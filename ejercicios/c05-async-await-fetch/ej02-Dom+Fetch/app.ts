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

const listaUsuarios = document.getElementById('listaUsuarios') as HTMLUListElement;
const mensajeEstado = document.getElementById('mensajeEstado') as HTMLDivElement;

async function renderizarUsuarios(): Promise<void> {
    mensajeEstado.innerHTML = 'Cargando usuarios...';
    listaUsuarios.innerHTML = "";
    try {
        const usuarios = await obtenerusuarios();
        mensajeEstado.innerHTML = "";
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `ID: ${usuario.id} | Nombre: ${usuario.name} | Email: ${usuario.email} | Teléfono: ${usuario.phone}`;
            listaUsuarios.appendChild(li);
        });
    } catch (error) {
        mensajeEstado.innerHTML = '<p style="color: red;">Error al cargar los usuarios.</p>';
    }
}

renderizarUsuarios();