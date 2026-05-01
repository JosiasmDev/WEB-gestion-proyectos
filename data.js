const projectTasks = [
    // BLOQUE 1 (Fundamentos y CRUD)
    {
        id: 1,
        block: 1,
        title: "Setup React Native & Arquitectura",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Inicializa el proyecto con <code>npx react-native@latest init OrganizadorApp</code>.</li>
  <li>Configura la estructura de carpetas: <code>/src/components</code>, <code>/src/screens</code>, <code>/src/navigation</code>, <code>/src/services</code>, <code>/src/store</code>, <code>/src/utils</code>.</li>
  <li>Instala ESLint y Prettier. Asegúrate de configurar las reglas en <code>.eslintrc.js</code>.</li>
  <li>Instala <code>react-navigation/native</code> y <code>react-navigation/stack</code> para la navegación base.</li>
  <li>Crea el archivo <code>src/App.tsx</code> como punto de entrada principal.</li>
</ul>
<p><b>Entregable:</b> Repositorio de GitHub subido con el esqueleto y un <code>README.md</code> indicando los comandos de instalación.</p>
        `
    },
    {
        id: 2,
        block: 1,
        title: "Setup de Firebase y Base de Datos",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea un proyecto en Firebase Console llamado "SmartTimeManager".</li>
  <li>Registra la app de iOS y Android en Firebase Console, descargando los archivos necesarios.</li>
  <li>Instala los paquetes: <code>@react-native-firebase/app</code>, <code>@react-native-firebase/auth</code>, <code>@react-native-firebase/firestore</code>.</li>
  <li>Crea el archivo <code>src/services/firebaseConfig.ts</code> para inicializar o exportar referencias.</li>
  <li>Define en un archivo de texto <code>docs/schema.md</code> la estructura de colecciones de Firestore: Colección <code>users</code> y subcolección <code>tasks</code>.</li>
</ul>
<p><b>Entregable:</b> Conexión exitosa a Firebase verificable al arrancar la app sin errores.</p>
        `
    },
    {
        id: 3,
        block: 1,
        title: "UI de Autenticación (Login & Registro)",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea las pantallas <code>LoginScreen.tsx</code> y <code>RegisterScreen.tsx</code> en <code>/src/screens/Auth/</code>.</li>
  <li>Diseña inputs limpios para email y contraseña usando un sistema de diseño propio (botones redondeados, colores definidos).</li>
  <li>Crea un componente reutilizable <code>CustomInput.tsx</code> y <code>CustomButton.tsx</code> en <code>/src/components/UI/</code>.</li>
  <li>Añade validaciones básicas (email válido, password &gt; 6 caracteres).</li>
</ul>
<p><b>Entregable:</b> UI navegable entre Login y Registro. No hace falta que la lógica de Firebase funcione aún en esta tarea.</p>
        `
    },
    {
        id: 4,
        block: 1,
        title: "Lógica de Autenticación",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Implementa la función <code>loginUser(email, password)</code> y <code>registerUser(email, password, name)</code> en <code>src/services/authService.ts</code> usando Firebase Auth.</li>
  <li>Al registrarse, crea automáticamente un documento en Firestore <code>users/{uid}</code> con los datos básicos del usuario.</li>
  <li>Crea un contexto global o store (usando Zustand o Context API) en <code>src/store/useAuthStore.ts</code> para guardar el estado del usuario (logueado o no).</li>
  <li>Implementa un "Listener" <code>onAuthStateChanged</code> en el archivo principal para cambiar entre el Stack de Autenticación y el Stack Principal automáticamente.</li>
</ul>
<p><b>Entregable:</b> Flujo completo: Registro -&gt; DB guardada -&gt; Ingreso automático a la pantalla principal.</p>
        `
    },
    {
        id: 5,
        block: 1,
        title: "Navegación Principal (Bottom Tabs)",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala <code>@react-navigation/bottom-tabs</code>.</li>
  <li>Crea el archivo <code>src/navigation/MainTabNavigator.tsx</code>.</li>
  <li>Define 3 pestañas: <b>Hoy</b> (HomeScreen), <b>Nueva Tarea</b> (dummy por ahora), y <b>Perfil</b> (ProfileScreen).</li>
  <li>Usa iconos vectoriales (instalar <code>react-native-vector-icons</code>) para cada pestaña.</li>
  <li>Aplica colores de la marca para el estado activo e inactivo de las pestañas.</li>
</ul>
<p><b>Entregable:</b> Navegación inferior funcional tras hacer login.</p>
        `
    },
    {
        id: 6,
        block: 1,
        title: "Modelo de Datos de Tareas (TypeScript)",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea el archivo <code>src/models/Task.ts</code>.</li>
  <li>Define la interfaz <code>ITask</code> con las propiedades: <code>id (string)</code>, <code>title (string)</code>, <code>description (string)</code>, <code>deadline (Date)</code>, <code>estimatedTimeMinutes (number)</code>, <code>status ('pending'|'in-progress'|'completed')</code>, <code>createdAt (Date)</code>.</li>
  <li>Crea un archivo <code>src/utils/dateFormatter.ts</code> con funciones para parsear fechas de Firebase a string legible y viceversa (recomiendo usar <code>date-fns</code> o <code>dayjs</code>).</li>
</ul>
<p><b>Entregable:</b> Tipado estricto preparado para el CRUD.</p>
        `
    },
    {
        id: 7,
        block: 1,
        title: "UI de Creación de Tareas",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea la pantalla <code>CreateTaskScreen.tsx</code>.</li>
  <li>Debe contener: Campo de Título, Descripción, un DatePicker para la fecha límite (usar <code>react-native-date-picker</code>), y un input numérico para el tiempo estimado (en minutos).</li>
  <li>Implementa manejo de estado del formulario (puedes usar <code>react-hook-form</code> si lo prefieres, o estado local).</li>
  <li>Botón principal de "Guardar Tarea".</li>
</ul>
<p><b>Entregable:</b> Pantalla de creación lista para recibir la lógica de backend.</p>
        `
    },
    {
        id: 8,
        block: 1,
        title: "Lógica Backend: Creación de Tareas",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea <code>src/services/taskService.ts</code>.</li>
  <li>Implementa <code>addTask(userId: string, task: Omit&lt;ITask, 'id'&gt;)</code>.</li>
  <li>La función debe insertar en la colección <code>users/{userId}/tasks</code>.</li>
  <li>Integra esta función en el botón de "Guardar" de <code>CreateTaskScreen.tsx</code>.</li>
  <li>Añade un Toast o Alert de éxito y navega de vuelta al Home.</li>
</ul>
<p><b>Entregable:</b> Tareas guardándose en Firebase Firestore correctamente.</p>
        `
    },
    {
        id: 9,
        block: 1,
        title: "Lógica Backend: Lectura de Tareas en Tiempo Real",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>En <code>taskService.ts</code>, implementa un listener <code>subscribeToTasks(userId: string, callback: (tasks: ITask[]) => void)</code> usando <code>onSnapshot</code> de Firestore.</li>
  <li>Crea un store o context en <code>src/store/useTaskStore.ts</code> que almacene el array de tareas.</li>
  <li>Al montar <code>HomeScreen.tsx</code>, inicia la suscripción. Asegúrate de limpiar la suscripción (unsubscribe) cuando el componente se desmonte.</li>
</ul>
<p><b>Entregable:</b> Estado global de tareas siempre sincronizado con Firestore.</p>
        `
    },
    {
        id: 10,
        block: 1,
        title: "UI de la Pantalla Principal (Home)",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Diseña el <code>HomeScreen.tsx</code>.</li>
  <li>Añade un saludo personalizado usando el nombre del usuario logueado.</li>
  <li>Implementa una <code>FlatList</code> para iterar las tareas pendientes del store.</li>
  <li>Crea un componente <code>TaskCard.tsx</code> que reciba un objeto <code>ITask</code> como prop y muestre título, y un badge con la fecha límite.</li>
</ul>
<p><b>Entregable:</b> Lista de tareas visible en la aplicación.</p>
        `
    },
    {
        id: 11,
        block: 1,
        title: "Funcionalidad de Completar Tareas",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Añade un checkbox o botón circular interactivo a <code>TaskCard.tsx</code>.</li>
  <li>En <code>taskService.ts</code> implementa <code>updateTaskStatus(userId, taskId, newStatus)</code>.</li>
  <li>Al hacer click en el checkbox, cambia el estado a <code>'completed'</code> en la base de datos.</li>
  <li>La FlatList del Home debe filtrar (o tener un tab separado) para ocultar las tareas completadas o mostrarlas tachadas.</li>
</ul>
<p><b>Entregable:</b> Tareas que se marcan como completadas y se actualizan en DB.</p>
        `
    },
    {
        id: 12,
        block: 1,
        title: "Borrado de Tareas y Swipe-to-delete",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala e implementa <code>react-native-gesture-handler</code> y <code>react-native-reanimated</code>.</li>
  <li>Usa un componente de Swipeable (o crea uno propio con reanimated) en el <code>TaskCard.tsx</code> para permitir deslizar a la izquierda y revelar un botón rojo de "Borrar".</li>
  <li>Implementa la función <code>deleteTask(userId, taskId)</code> en <code>taskService.ts</code> y conéctala.</li>
  <li>Añade confirmación por Alert antes de borrar definitivamente.</li>
</ul>
<p><b>Entregable:</b> Eliminación de tareas con gesto fluido.</p>
        `
    },
    {
        id: 13,
        block: 1,
        title: "Pantalla de Perfil de Usuario",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Desarrolla <code>ProfileScreen.tsx</code>.</li>
  <li>Muestra la información básica del usuario leída del contexto (Nombre, Email).</li>
  <li>Muestra estadísticas estáticas (por ahora falsas) como "Tareas completadas esta semana: 10".</li>
  <li>Añade un botón de "Cerrar Sesión" que ejecute <code>firebase.auth().signOut()</code>.</li>
</ul>
<p><b>Entregable:</b> Vista de perfil y funcionalidad de logout operativas.</p>
        `
    },
    {
        id: 14,
        block: 1,
        title: "Reglas de Seguridad de Firestore",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Ve a la consola de Firebase -> Firestore -> Reglas.</li>
  <li>Escribe reglas para que los usuarios solo puedan leer, escribir y borrar documentos dentro de su propia colección <code>users/{userId}</code>.</li>
  <li>Ejemplo: <code>allow read, write: if request.auth != null && request.auth.uid == userId;</code></li>
  <li>Documenta estas reglas en <code>docs/security-rules.txt</code> y déjalas en el repositorio.</li>
</ul>
<p><b>Entregable:</b> Base de datos asegurada contra accesos no autorizados.</p>
        `
    },
    {
        id: 15,
        block: 1,
        title: "Gestión de Estados de Carga (Loading States)",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea un componente <code>FullScreenLoader.tsx</code> con un <code>ActivityIndicator</code> centrado.</li>
  <li>Aplica este loader en: Login (mientras autentica), Registro, y al cargar la vista de Home por primera vez (mientras se descargan las tareas iniciales).</li>
  <li>Inhabilita los botones de Submit durante el <code>isLoading = true</code>.</li>
</ul>
<p><b>Entregable:</b> UX mejorada, sin bloqueos silenciosos de la app.</p>
        `
    },
    {
        id: 16,
        block: 1,
        title: "Manejo Global de Errores",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea <code>src/utils/errorHandler.ts</code> con la función <code>handleError(error: any)</code>.</li>
  <li>La función debe mapear los códigos de error de Firebase a mensajes amigables en español.</li>
  <li>Implementa una librería de Toasts y reemplaza todos los <code>console.error</code> y <code>Alert</code> básicos con Toasts atractivos.</li>
</ul>
<p><b>Entregable:</b> Errores informados elegantemente al usuario.</p>
        `
    },
    {
        id: 17,
        block: 1,
        title: "Soporte Offline Básico",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Firebase Firestore tiene persistencia offline nativa, pero a veces en React Native requiere configuración manual.</li>
  <li>Asegúrate de inicializar Firestore con un tamaño de caché definido (ej. 50MB).</li>
  <li>Instala <code>@react-native-community/netinfo</code>.</li>
  <li>Crea un banner superior rojo pequeño en la app que aparezca automáticamente si <code>isConnected === false</code> diciendo "Modo Sin Conexión".</li>
</ul>
<p><b>Entregable:</b> App usable y con feedback visual cuando no hay internet.</p>
        `
    },
    {
        id: 18,
        block: 1,
        title: "Animaciones de Celebración",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala <code>lottie-react-native</code>.</li>
  <li>Busca una animación Lottie de "confetti" o "checkmark" en LottieFiles y descárgala como JSON (guárdala en <code>src/assets/animations/confetti.json</code>).</li>
  <li>Dispara la animación en el centro de la pantalla cada vez que el usuario marque una tarea como <code>completed</code>.</li>
</ul>
<p><b>Entregable:</b> Interacciones de completar tarea mucho más gratificantes.</p>
        `
    },
    {
        id: 19,
        block: 1,
        title: "Edición de Tareas",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>En el <code>TaskCard</code>, añade una opción para "Editar" (puede ser un icono de lápiz o desde el swipe).</li>
  <li>Reutiliza <code>CreateTaskScreen.tsx</code> pero pasándole parámetros por navegación (<code>route.params.taskToEdit</code>).</li>
  <li>Si hay <code>taskToEdit</code>, pre-llena los inputs.</li>
  <li>El botón de guardar debe llamar a <code>updateTaskDetails(userId, taskId, newData)</code> en vez de crear una nueva.</li>
</ul>
<p><b>Entregable:</b> Funcionalidad CRUD completa operativa.</p>
        `
    },
    {
        id: 20,
        block: 1,
        title: "Tests de Interfaz y Revisión Bloque 1",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala Jest y <code>@testing-library/react-native</code>.</li>
  <li>Escribe pruebas unitarias para los componentes básicos: <code>CustomButton.test.tsx</code>, <code>CustomInput.test.tsx</code>.</li>
  <li>Escribe un test para verificar que el <code>dateFormatter.ts</code> funciona correctamente en diversos casos de bordes.</li>
  <li>Realiza un code review del equipo sobre toda la base del Bloque 1.</li>
</ul>
<p><b>Entregable:</b> Cobertura básica de tests y código pulido.</p>
        `
    },

    // BLOQUE 2 (Lógica Inteligente y Pulido)
    {
        id: 21,
        block: 2,
        title: "Arquitectura del Sistema de Colores Dinámico",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>El objetivo es que la UI reaccione a la urgencia.</li>
  <li>Crea un hook <code>useDynamicTheme(tasks)</code> en <code>src/hooks/</code>.</li>
  <li>Este hook evaluará todas las tareas pendientes del día.</li>
  <li>Definir la regla: Si hay &gt; 1 tarea "Urgente", el tema principal será Rojo. Si está al día, Verde. Si en progreso, Azul.</li>
  <li>El hook debe devolver el objeto de theme con los colores calculados.</li>
</ul>
<p><b>Entregable:</b> Lógica central de tematización generada y probada.</p>
        `
    },
    {
        id: 22,
        block: 2,
        title: "Implementación Visual del Color Indicator",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Conecta <code>useDynamicTheme</code> al Root de la aplicación.</li>
  <li>Modifica el Header (Top Bar) de React Navigation para que cambie su color de fondo dinámicamente según el resultado del hook.</li>
  <li>Aplica transiciones suaves al cambiar el color (usando Reanimated).</li>
</ul>
<p><b>Entregable:</b> Barra superior cambia de color según el estrés/urgencia del usuario.</p>
        `
    },
    {
        id: 23,
        block: 2,
        title: "Algoritmo de Prioridad Inteligente",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea <code>src/utils/priorityAlgorithm.ts</code>.</li>
  <li>Escribe la función <code>calculateTaskPriority(deadline: Date, estimatedMinutes: number, currentTime: Date): number</code>.</li>
  <li>Fórmula sugerida: <code>(TimeRemainingMinutes / estimatedMinutes)</code>. Si el valor es &lt; 1.5, es de Alta Prioridad.</li>
  <li>Integra esta función para ordenar automáticamente la <code>FlatList</code> del <code>HomeScreen</code> (arriba lo más urgente).</li>
</ul>
<p><b>Entregable:</b> Lista de tareas que se auto-ordena inteligentemente.</p>
        `
    },
    {
        id: 24,
        block: 2,
        title: "Integración de Notificaciones Locales",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala <code>notifee</code>.</li>
  <li>Configura los permisos de notificaciones para iOS y Android en <code>App.tsx</code>.</li>
  <li>Implementa la función <code>scheduleLocalNotification(task)</code> que se dispare automáticamente al crear una tarea, agendando un aviso 30 minutos antes del deadline.</li>
</ul>
<p><b>Entregable:</b> Notificaciones que llegan al móvil a la hora indicada.</p>
        `
    },
    {
        id: 25,
        block: 2,
        title: "Notificaciones Inteligentes no Intrusivas",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea una regla para evitar el spam de notificaciones.</li>
  <li>En <code>notificationService.ts</code>, agrupa las tareas si sus deadlines están muy cerca (ej. &lt; 1 hora de diferencia).</li>
  <li>En lugar de múltiples notificaciones, envía 1: "Tienes 3 tareas urgentes acercándose".</li>
</ul>
<p><b>Entregable:</b> Sistema de alertas consolidado y respetuoso con el usuario.</p>
        `
    },
    {
        id: 26,
        block: 2,
        title: "Estadísticas de Productividad: Backend",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>En Firestore, necesitamos guardar el histórico de resoluciones.</li>
  <li>Modifica <code>updateTaskStatus</code> para que, al completar una tarea, grabe un registro en una subcolección <code>users/{userId}/productivityLogs</code> con la fecha, la tarea y si se completó a tiempo o tarde.</li>
  <li>Crea una Cloud Function de Firebase sencilla (usando node.js) que se ejecute diariamente para sumar los minutos trabajados de cada usuario.</li>
</ul>
<p><b>Entregable:</b> Datos históricos almacenándose correctamente.</p>
        `
    },
    {
        id: 27,
        block: 2,
        title: "Gráficos de Productividad: UI",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala <code>react-native-chart-kit</code> o <code>victory-native</code>.</li>
  <li>Añade un nuevo Tab "Estadísticas" en la navegación inferior.</li>
  <li>Obtén los <code>productivityLogs</code> del usuario de la última semana.</li>
  <li>Renderiza un gráfico de barras mostrando los "Minutos productivos por día".</li>
  <li>Usa el diseño visual premium establecido.</li>
</ul>
<p><b>Entregable:</b> Pantalla de analíticas visual y funcional.</p>
        `
    },
    {
        id: 28,
        block: 2,
        title: "Modelo de IA Ligero: Base de datos de Hábitos",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea <code>src/services/aiRecommendationService.ts</code>.</li>
  <li>Implementa una función matemática (sin necesidad de Machine Learning complejo, algo probabilístico sirve) que analice a qué hora el usuario suele marcar más tareas como completadas.</li>
  <li>Ejemplo: Si completa el 80% entre las 10:00 y las 12:00, determina que ese es su "Peak Time" (Hora punta).</li>
</ul>
<p><b>Entregable:</b> Lógica de extracción de patrones de horario del usuario.</p>
        `
    },
    {
        id: 29,
        block: 2,
        title: "Modelo de IA Ligero: Recomendación UI",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>En el <code>HomeScreen</code>, crea un componente tipo "Insight Card".</li>
  <li>Usa la lógica de la Tarea 28. Si el usuario intenta programar una tarea difícil a una hora que no es su "Peak Time", muestra un pequeño aviso: <em>"Insight: Sueles ser más productivo en las mañanas. ¿Mover esta tarea a las 10:00 AM?"</em></li>
</ul>
<p><b>Entregable:</b> Tarjetas de sugerencias basadas en hábitos en la UI.</p>
        `
    },
    {
        id: 30,
        block: 2,
        title: "Sugerencias de Descanso Activo",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Implementa la técnica Pomodoro modificada de forma silenciosa.</li>
  <li>Si el usuario marca &gt; 120 minutos de tareas estimadas como <code>completed</code> en menos de 3 horas, muestra automáticamente un modal de pantalla completa animado recomendando un descanso.</li>
</ul>
<p><b>Entregable:</b> Feature de wellbeing integrada y testeada.</p>
        `
    },
    {
        id: 31,
        block: 2,
        title: "Sincronización con Google Calendar (Setup)",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Registra la app en Google Cloud Console y habilita la API de Google Calendar.</li>
  <li>Instala <code>@react-native-google-signin/google-signin</code>.</li>
  <li>Configura el botón "Sincronizar Calendario" en la pantalla de Configuración/Perfil para solicitar permisos.</li>
</ul>
<p><b>Entregable:</b> Obtención exitosa del Token de acceso de Google.</p>
        `
    },
    {
        id: 32,
        block: 2,
        title: "Sincronización Bidireccional de Eventos",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Con el token obtenido, haz un fetch de los eventos del usuario.</li>
  <li>Convierte los eventos leídos al formato de tareas de la app y muéstralos en el <code>HomeScreen</code> con un pequeño icono indicando el origen.</li>
</ul>
<p><b>Entregable:</b> Integración visual de la agenda de Google en la app.</p>
        `
    },
    {
        id: 33,
        block: 2,
        title: "Dark Mode Dinámico",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>La app debe responder al tema del sistema operativo (iOS/Android).</li>
  <li>Usa <code>useColorScheme</code> de React Native.</li>
  <li>Asegúrate de que la paleta de colores del Tema Dinámico (Tarea 21) tenga variables para contrastar correctamente en Dark Mode.</li>
</ul>
<p><b>Entregable:</b> Soporte impecable de Dark/Light mode.</p>
        `
    },
    {
        id: 34,
        block: 2,
        title: "Soporte de Accesibilidad (a11y)",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Repasa todos los componentes principales (Botones, Checkboxes, Inputs).</li>
  <li>Añade las props de accesibilidad de React Native.</li>
  <li>Prueba la app con VoiceOver (iOS) o TalkBack (Android) y asegúrate de que un usuario invidente pueda completar una tarea.</li>
</ul>
<p><b>Entregable:</b> App 100% inclusiva.</p>
        `
    },
    {
        id: 35,
        block: 2,
        title: "Refactorización y Code Splitting",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Analiza componentes largos y divídelos en componentes más pequeños.</li>
  <li>Extrae la lógica compleja a Custom Hooks específicos (ej. separar la lógica de fetch de la vista).</li>
  <li>Limpia importaciones no usadas e instala/corre <code>eslint --fix</code>.</li>
</ul>
<p><b>Entregable:</b> Código limpio, modular y preparado para escalar.</p>
        `
    },
    {
        id: 36,
        block: 2,
        title: "Optimización de Rendimiento",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Usa el Profiler de React Native.</li>
  <li>Implementa <code>React.memo()</code> en el componente <code>TaskCard</code> para evitar re-renderizados innecesarios al desplazar la lista.</li>
  <li>Reemplaza imágenes pesadas por WebP o vectoriales.</li>
</ul>
<p><b>Entregable:</b> 60 FPS estables al hacer scroll en listas grandes.</p>
        `
    },
    {
        id: 37,
        block: 2,
        title: "Icono de la App y Splash Screen",
        difficulty: "Fácil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Crea un diseño de Icono y expórtalo a los tamaños requeridos.</li>
  <li>Usa un paquete como <code>react-native-bootsplash</code> para implementar una pantalla de carga nativa sin destellos blancos.</li>
</ul>
<p><b>Entregable:</b> Branding nativo integrado.</p>
        `
    },
    {
        id: 38,
        block: 2,
        title: "Configuración de Entornos (Staging/Production)",
        difficulty: "Difícil",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Instala <code>react-native-config</code>.</li>
  <li>Crea los archivos <code>.env.development</code> y <code>.env.production</code> con distintas claves de Firebase.</li>
  <li>Configura los esquemas en Xcode (iOS) y buildTypes en build.gradle (Android).</li>
</ul>
<p><b>Entregable:</b> Variables de entorno separadas correctamente.</p>
        `
    },
    {
        id: 39,
        block: 2,
        title: "Generación de Bundles (AAB/IPA)",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Genera los certificados y Keystores necesarios para Android y firmas en Apple Developer.</li>
  <li>Ejecuta <code>./gradlew bundleRelease</code> para Android.</li>
  <li>Configura el Archive en Xcode y valida la app en Organizer.</li>
</ul>
<p><b>Entregable:</b> Archivos finales listos para subir a las tiendas.</p>
        `
    },
    {
        id: 40,
        block: 2,
        title: "Despliegue a TestFlight y Google Play Console",
        difficulty: "Media",
        description: `
<h3>Instrucciones Precisas</h3>
<ul>
  <li>Sube el archivo <code>.aab</code> a Google Play Console en la pista de Pruebas Internas.</li>
  <li>Sube el archivo a App Store Connect.</li>
  <li>Añade a los testers (Bamba, Ruben, Oscar, Josias) en TestFlight y Play Console.</li>
  <li>Redacta notas de versión para el equipo.</li>
</ul>
<p><b>Entregable:</b> App distribuida a los dispositivos del equipo.</p>
        `
    }
];

if (typeof window !== 'undefined') {
    window.projectTasks = projectTasks;
} else if (typeof module !== 'undefined') {
    module.exports = projectTasks;
}
