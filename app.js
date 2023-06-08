new Vue({
  el: "#app",
  data() {
    return {
      tareas: [], // Array para almacenar las tareas.
      nuevaTarea: "", // Variable para almacenar el valor del input de nueva tarea.
      busqueda: "", // Variable para almacenar el texto de búsqueda.
      tareaEditada: null,
    };
  },
  created() {
    this.fetchTareas(); // Llama al método fetchTareas() cuando se crea el componente.
  },
  computed: {
    tareasPendientes() {
      // Propiedad computada para obtener las tareas pendientes.
      return this.tareas.filter((tarea) => !tarea.completada);
    },
    tareasCompletadas() {
      // Propiedad computada para obtener las tareas completadas.
      return this.tareas.filter((tarea) => tarea.completada);
    },
    contadorPendientes() {
      // Propiedad computada para obtener el contador de tareas pendientes.
      return this.tareasPendientes.length;
    },
    contadorCompletadas() {
      // Propiedad computada para obtener el contador de tareas completadas.
      return this.tareasCompletadas.length;
    },
    tareasFiltradas() {
      return this.tareas.filter((tarea) => {
        return tarea.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      });
    },
  },
  methods: {
    fetchTareas() {
      // Método para obtener las tareas desde un archivo JSON.
      fetch("tareas.json")
        .then((response) => response.json())
        .then((data) => {
          this.tareas = data; // Asigna los datos obtenidos al array tareas.
        })
        .catch((error) => {
          console.error("Error al obtener las tareas:", error);
        });
    },
    agregarTarea() {
      // Método para agregar una nueva tarea.
      const nuevaTarea = {
        nombre: this.nuevaTarea,
        completada: false,
      };
      Vue.set(this.tareas, this.tareas.length, nuevaTarea); // Agrega la nueva tarea al array tareas.
      this.nuevaTarea = ""; // Reinicia el valor del input de nueva tarea.
    },
    cambiarEstado(tarea) {
      // Método para cambiar el estado de una tarea.
      tarea.completada = !tarea.completada; // Invierte el valor del atributo completada de la tarea.
    },
    eliminarTarea(tarea) {
      // Método para eliminar una tarea.
      const indice = this.tareas.indexOf(tarea);
      this.tareas.splice(indice, 1); // Elimina la tarea del array tareas.
    },
    editarTarea(tarea) {
      this.tareaEditada = tarea;
    },
    guardarEdicion() {
      this.tareaEditada = null;
    },
  },
});
