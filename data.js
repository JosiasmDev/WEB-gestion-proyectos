const projectTasks = [
    // BLOQUE 1 (Fundamentos y CRUD)
    {
        id: 1,
        block: 1,
        title: "Setup React Native & Arquitectura",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Crear el esqueleto base del proyecto para que todos los demás tengan donde programar.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tener Node.js instalado en tu PC.</li>
                <li>Tener Android Studio configurado (o Xcode si usas Mac).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre tu terminal y navega a la carpeta donde guardarás el proyecto.</li>
                <li>Ejecuta el comando: <code>npx react-native@latest init OrganizadorApp</code>. Espera a que termine.</li>
                <li>Entra a la carpeta del proyecto: <code>cd OrganizadorApp</code>.</li>
                <li>Crea la siguiente estructura de carpetas dentro de la carpeta raíz:
                    <ul>
                        <li><code>src/components</code> (para botones, textos, etc.)</li>
                        <li><code>src/screens</code> (para las pantallas completas)</li>
                        <li><code>src/navigation</code> (para manejar el cambio de pantallas)</li>
                        <li><code>src/services</code> (para las llamadas a Firebase)</li>
                        <li><code>src/store</code> (para guardar datos globales)</li>
                        <li><code>src/utils</code> (para funciones útiles)</li>
                    </ul>
                </li>
                <li>Instala la navegación base ejecutando: <code>npm install @react-navigation/native @react-navigation/stack</code></li>
                <li>Crea un archivo llamado <code>App.tsx</code> dentro de la carpeta <code>src</code>. Este será el punto de entrada de nuestra app.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>No te preocupes si salen warnings amarillos en la consola. Solo presta atención a los errores en rojo. Si la instalación falla, intenta usar <code>npx react-native start --reset-cache</code>.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>La app se ejecuta correctamente en el emulador (con <code>npm run android</code> o <code>npm run ios</code>) y muestra una pantalla en blanco.</li>
                <li>El código está subido a la rama <code>main</code> de GitHub.</li>
            </ul>
        `
    },
    {
        id: 2,
        block: 1,
        title: "Setup de Firebase y Base de Datos",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Conectar nuestra aplicación a Google Firebase para tener una base de datos en la nube.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>La Tarea #1 debe estar terminada.</li>
                <li>Tener una cuenta de Google (Gmail).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Ve a <a href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a> y haz clic en "Añadir proyecto". Nómbralo "SmartTimeManager".</li>
                <li>En el panel izquierdo, haz clic en el icono de Android y sigue los pasos para registrar la app. El nombre del paquete suele ser <code>com.organizadorapp</code>.</li>
                <li>Descarga el archivo <code>google-services.json</code> y colócalo dentro de la carpeta <code>android/app/</code> de tu proyecto.</li>
                <li>En tu terminal, instala Firebase: <code>npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore</code>.</li>
                <li>Crea el archivo <code>src/services/firebaseConfig.ts</code>. No necesitas programar nada complejo aquí aún, solo importa firebase para que se inicialice.</li>
                <li>En la consola de Firebase, ve a "Firestore Database" y crea una base de datos en "Modo de prueba".</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Configurar Firebase en React Native puede ser lioso. Lee la documentación oficial de <em>React Native Firebase</em>, la sección de "Getting Started", te guiará paso a paso en qué líneas de código añadir a los archivos de Android.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>La app compila sin errores después de instalar Firebase.</li>
                <li>Puedes ver el proyecto creado en la consola de Firebase.</li>
            </ul>
        `
    },
    {
        id: 3,
        block: 1,
        title: "UI de Autenticación (Login & Registro)",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Diseñar las pantallas visuales donde el usuario introducirá su email y contraseña. Aún no funcionarán, solo serán visuales.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>La Tarea #1 (Estructura) debe estar terminada.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>En la carpeta <code>src/screens</code>, crea una subcarpeta llamada <code>Auth</code>.</li>
                <li>Dentro de Auth, crea dos archivos: <code>LoginScreen.tsx</code> y <code>RegisterScreen.tsx</code>.</li>
                <li>Crea dos componentes básicos reutilizables en <code>src/components</code>:
                    <ul>
                        <li><code>CustomInput.tsx</code>: Un campo de texto estilizado (con bordes redondeados).</li>
                        <li><code>CustomButton.tsx</code>: Un botón estilizado con color de fondo y texto centrado.</li>
                    </ul>
                </li>
                <li>En <code>LoginScreen.tsx</code>, usa <code>CustomInput</code> dos veces (para Email y Contraseña) y usa <code>CustomButton</code> para "Entrar".</li>
                <li>Haz lo mismo para <code>RegisterScreen.tsx</code>, pero añade un campo más para "Nombre".</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Usa <code>StyleSheet.create</code> de React Native para darle estilos bonitos (padding, margin, backgroundColor). Fíjate en los colores de esta misma web para inspirarte.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Ambas pantallas existen y se ven bien visualmente.</li>
                <li>Se puede navegar de Login a Registro usando un simple botón de texto.</li>
            </ul>
        `
    },
    {
        id: 4,
        block: 1,
        title: "Lógica de Autenticación",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Hacer que el Login y Registro funcionen de verdad conectándose a Firebase, permitiendo crear usuarios reales.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tarea #2 (Firebase setup) terminada.</li>
                <li>Tarea #3 (UI Auth) terminada.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>En la consola de Firebase, ve a "Authentication", haz clic en "Comenzar" y habilita el proveedor de "Correo electrónico/contraseña".</li>
                <li>En tu código, abre <code>src/services/authService.ts</code>.</li>
                <li>Crea una función <code>registerUser(email, password, name)</code> que use <code>auth().createUserWithEmailAndPassword(email, password)</code>.</li>
                <li>Crea una función <code>loginUser(email, password)</code> que use <code>auth().signInWithEmailAndPassword(email, password)</code>.</li>
                <li>En tu <code>LoginScreen.tsx</code>, vincula el botón de "Entrar" para que llame a <code>loginUser</code> usando los datos que el usuario escribió.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>El manejo del estado (state) es vital aquí. Usa <code>useState</code> para guardar lo que el usuario escribe en los inputs. Envuelve las llamadas a Firebase en un <code>try/catch</code> para capturar errores (ej. "contraseña incorrecta") y muéstralos en un <code>Alert.alert()</code>.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Un usuario puede registrarse y aparecer en la pestaña "Authentication" de Firebase Console.</li>
                <li>Un usuario puede hacer login exitosamente.</li>
            </ul>
        `
    },
    {
        id: 5,
        block: 1,
        title: "Navegación Principal (Bottom Tabs)",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Añadir una barra de navegación en la parte inferior de la app (como en Instagram o WhatsApp) para moverse entre pantallas principales.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tener la estructura del proyecto y navegación instalada.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Instala la librería: <code>npm install @react-navigation/bottom-tabs</code>.</li>
                <li>Crea el archivo <code>src/navigation/MainTabNavigator.tsx</code>.</li>
                <li>Dentro, importa <code>createBottomTabNavigator</code>.</li>
                <li>Configura 3 pantallas vacías por ahora (crea los archivos en <code>src/screens/Main/</code>):
                    <ul>
                        <li><code>HomeScreen.tsx</code> (Inicio)</li>
                        <li><code>CreateTaskScreen.tsx</code> (Nueva Tarea)</li>
                        <li><code>ProfileScreen.tsx</code> (Perfil)</li>
                    </ul>
                </li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>No te compliques con los iconos todavía. Ponles etiquetas de texto a las pestañas. Asegúrate de que el TabNavigator solo se muestre SI el usuario está logueado.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al hacer login, el usuario ve la barra inferior y puede tocar las 3 pestañas para cambiar de pantalla.</li>
            </ul>
        `
    },
    {
        id: 6,
        block: 1,
        title: "Modelo de Datos de Tareas (TypeScript)",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Definir la "forma" de nuestras tareas en código. Esto es crucial en TypeScript para evitar errores en el futuro.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Comprender interfaces básicas en TypeScript.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea el archivo <code>src/models/Task.ts</code>.</li>
                <li>Escribe una interfaz: <code>export interface ITask { id: string; title: string; description: string; status: 'pending'|'in-progress'|'completed'; deadline: Date; }</code>.</li>
                <li>Expórtala para poder usarla en otros archivos.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Piensa en la interfaz como un "contrato". Cualquier tarea que creemos en la app TENDRÁ que tener esos campos, si le falta uno, el editor de código se quejará y evitará que la app falle al ejecutarse.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>El archivo existe y la interfaz está correctamente formateada sin errores de TypeScript.</li>
            </ul>
        `
    },
    {
        id: 7,
        block: 1,
        title: "UI de Creación de Tareas",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Diseñar el formulario donde el usuario introducirá los datos para crear una nueva tarea en su agenda.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>La navegación del Bottom Tabs (Tarea 5) debe estar funcionando.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre <code>CreateTaskScreen.tsx</code>.</li>
                <li>Añade tus <code>CustomInput</code> para: Título y Descripción de la tarea.</li>
                <li>Instala un selector de fecha: <code>npm install react-native-date-picker</code>.</li>
                <li>Añade este DatePicker debajo de la descripción para elegir el "Plazo (Deadline)".</li>
                <li>Añade un <code>CustomButton</code> grande al final que diga "Guardar Tarea".</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Usa <code>useState</code> para guardar el valor del título, descripción y la fecha seleccionada. Almacenar la fecha (Date) en un estado al principio parece difícil, pero el DatePicker de React Native es muy intuitivo.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>La pantalla de creación de tareas se ve bien. Puedes escribir en los inputs y seleccionar una fecha y hora correcta.</li>
            </ul>
        `
    },
    {
        id: 8,
        block: 1,
        title: "Lógica Backend: Creación de Tareas",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Hacer que el botón de "Guardar Tarea" envíe los datos a Firestore para que se guarden permanentemente.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>El usuario debe estar logueado (necesitamos su UID).</li>
                <li>Firebase Firestore inicializado.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea <code>src/services/taskService.ts</code>.</li>
                <li>Escribe una función asíncrona <code>addTask(userId, taskData)</code>.</li>
                <li>Dentro usa: <code>firestore().collection('users').doc(userId).collection('tasks').add(taskData)</code>.</li>
                <li>En tu <code>CreateTaskScreen</code>, importa esta función y llámala cuando pulsen "Guardar Tarea", pasando los datos de los inputs y el UID del usuario logueado.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Para obtener el UID del usuario, puedes usar <code>auth().currentUser?.uid</code>. Tras guardar la tarea exitosamente, usa la navegación para mandar al usuario de vuelta a la pantalla de Inicio.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al rellenar el formulario y guardar, los datos aparecen en la consola web de Firebase en la colección de tareas del usuario.</li>
            </ul>
        `
    },
    {
        id: 9,
        block: 1,
        title: "Lectura de Tareas en Tiempo Real",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Conseguir que la app escuche a Firebase y se actualice sola si se añaden tareas (incluso si se añaden desde otro móvil).</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Debe haber al menos 1 tarea guardada en Firebase (Tarea 8).</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre <code>taskService.ts</code>.</li>
                <li>Implementa <code>subscribeToTasks(userId, callback)</code> usando <code>onSnapshot</code> de Firestore.</li>
                <li>El callback debe recibir el array de tareas extraídas del documento de Firebase (tienes que mapear el <code>doc.id</code> y <code>doc.data()</code>).</li>
                <li>Llama a esto en <code>HomeScreen</code> dentro de un <code>useEffect</code>.</li>
                <li>Guarda las tareas en un state: <code>const [tasks, setTasks] = useState([])</code>.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Acuérdate de limpiar la suscripción cuando el componente se desmonte. El método <code>onSnapshot</code> devuelve una función que puedes retornar dentro del <code>useEffect</code> para cancelar la escucha.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Si añades una tarea manual en Firebase Console, debe aparecer mágicamente en la consola de tu React Native sin recargar la app.</li>
            </ul>
        `
    },
    {
        id: 10,
        block: 1,
        title: "UI de la Pantalla Principal (Home)",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Mostrar la lista de tareas al usuario en una lista interactiva y bonita en la pantalla principal.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tener el array de tareas guardado en el estado (Tarea 9).</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre <code>HomeScreen.tsx</code>.</li>
                <li>Usa el componente <code>FlatList</code> de React Native para iterar sobre el array de tareas del estado. Pon el array en el prop <code>data</code> y una función en <code>renderItem</code>.</li>
                <li>Crea un componente separado llamado <code>TaskCard.tsx</code> en la carpeta components.</li>
                <li>Haz que el <code>TaskCard</code> reciba una tarea por props y muestre un cuadrito con el título de la tarea y la fecha en pequeño.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>En el <code>keyExtractor</code> del FlatList, usa siempre el <code>id</code> de la tarea de Firebase. Da estilos de tarjeta al TaskCard con sombras ligeras (elevation en Android, shadowOpacity en iOS).</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Se ven las tareas del usuario en forma de tarjetas desplazables hacia abajo.</li>
            </ul>
        `
    },
    {
        id: 11,
        block: 1,
        title: "Funcionalidad de Completar Tareas",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Permitir al usuario marcar las tareas como hechas mediante un botón y que ese estado cambie en Firebase.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>La lista de tareas (Home) y las tarjetas (TaskCard) deben ser visibles.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Añade un botón circular (puede ser un icono vacío) a tu <code>TaskCard.tsx</code>.</li>
                <li>En <code>taskService.ts</code>, crea la función <code>updateTaskStatus(userId, taskId, newStatus)</code> usando <code>firestore().collection(...).doc(taskId).update({status: newStatus})</code>.</li>
                <li>Al hacer clic en el botón de la tarjeta, llama a esta función cambiando el status a 'completed'.</li>
                <li>Añade lógica visual a la tarjeta: Si el estado es 'completed', ponle un fondo más tenue y cambia el icono a un 'check' verde.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Dado que en la Tarea 9 usamos <code>onSnapshot</code>, al actualizar el documento en Firebase, tu FlatList se actualizará automáticamente sola.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al tocar el botón de completar, el estado cambia en Firebase y la tarjeta en la app cambia visualmente (ej. se vuelve más gris o se tacha).</li>
            </ul>
        `
    },
    {
        id: 12,
        block: 1,
        title: "Borrado de Tareas y Swipe-to-delete",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Implementar el típico gesto de iOS donde deslizas una tarea a la izquierda para revelar un botón rojo de borrar.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>La lista de tareas (Home) funcionando.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Instala <code>react-native-gesture-handler</code>.</li>
                <li>Importa el componente <code>Swipeable</code> de esa librería.</li>
                <li>Envuelve todo tu <code>TaskCard</code> dentro del componente <code>Swipeable</code>.</li>
                <li>Crea una función <code>renderRightActions</code> que dibuje un cuadrado rojo con la palabra "Borrar" o un icono de papelera.</li>
                <li>En <code>taskService.ts</code>, implementa <code>deleteTask(userId, taskId)</code> usando el método <code>.delete()</code> de Firestore.</li>
                <li>Conecta el botón rojo para que llame a esta función y avise con un <code>Alert</code> pidiendo confirmación.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Configurar el Swipeable puede ser tedioso la primera vez. Busca ejemplos en la documentación de <code>react-native-gesture-handler</code> de "Swipeable right actions".</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>El usuario desliza la tarjeta, ve el botón rojo, lo toca, confirma la alerta y la tarea se borra tanto de la pantalla como de la base de datos.</li>
            </ul>
        `
    },
    {
        id: 13,
        block: 1,
        title: "Pantalla de Perfil de Usuario",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Crear la vista de perfil donde el usuario pueda ver su correo y cerrar sesión en la app.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Navegación base y pestañas operativas.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre <code>ProfileScreen.tsx</code>.</li>
                <li>Extrae el email del usuario logueado usando <code>auth().currentUser?.email</code> y muéstralo en pantalla grande.</li>
                <li>Añade un <code>CustomButton</code> rojo grande al fondo que diga "Cerrar sesión".</li>
                <li>El botón debe ejecutar <code>auth().signOut()</code>.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Asegúrate de que tu componente principal <code>App.tsx</code> está escuchando los cambios de estado (onAuthStateChanged). Si es así, al hacer signOut, la app automáticamente te mandará a la pantalla de Login.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Se ve la información del usuario y al darle a salir, vuelves al Login y no puedes volver atrás sin iniciar sesión.</li>
            </ul>
        `
    },
    {
        id: 14,
        block: 1,
        title: "Reglas de Seguridad de Firestore",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Blindar la base de datos para evitar que un usuario malintencionado lea o modifique las tareas de otra persona.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Proyecto en Firebase y base de datos Firestore creada en modo prueba.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Ve a tu consola web de Firebase -> Firestore Database -> Pestaña "Reglas".</li>
                <li>Cambia el código que pone por defecto. Busca la línea de "match /{document=**}".</li>
                <li>Añade la siguiente regla específica para los usuarios: <code>match /users/{userId}/{document=**} { allow read, write: if request.auth != null && request.auth.uid == userId; }</code></li>
                <li>Borra cualquier regla global de "allow read, write: if true".</li>
                <li>Haz clic en "Publicar".</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>A partir de ahora, cada usuario solo podrá acceder a los documentos que cuelguen de <code>/users/su-propio-id/</code>. Si en la app alguien intenta descargar una lista con un ID diferente, Firebase denegará el acceso.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>La app debe seguir funcionando para tu usuario logueado. Si cierras sesión, ya no deberías poder leer la DB.</li>
            </ul>
        `
    },
    {
        id: 15,
        block: 1,
        title: "Gestión de Estados de Carga (Loading)",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Mostrar una rueda de carga (spinner) mientras la app conecta a internet para que el usuario no crea que la app se ha congelado.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Login implementado.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea un componente en <code>src/components/</code> llamado <code>FullScreenLoader.tsx</code>.</li>
                <li>Dentro, usa el componente nativo <code>ActivityIndicator</code> centrado en la pantalla (usa <code>flex: 1</code>, <code>justifyContent: 'center'</code>).</li>
                <li>En tu pantalla de Login, crea un estado <code>const [isLoading, setIsLoading] = useState(false)</code>.</li>
                <li>Antes de llamar a <code>auth().signIn...</code> pon <code>setIsLoading(true)</code>. Cuando termine (en el bloque finally), ponlo a <code>false</code>.</li>
                <li>En el JSX de Login, si <code>isLoading</code> es true, oculta el formulario y muestra tu <code>FullScreenLoader</code> (o deshabilita el botón mostrando el spinner dentro de él).</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Es una buena práctica en UX jamás dejar al usuario pulsando un botón sin darle ninguna respuesta visual. El ActivityIndicator tiene props como <code>size="large"</code> y <code>color="blue"</code>.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al intentar loguear, aparece una rueda de carga y el usuario no puede darle al botón dos veces.</li>
            </ul>
        `
    },
    {
        id: 16,
        block: 1,
        title: "Manejo Global de Errores",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Sustituir los feos "Alert" del sistema por "Toasts" elegantes (mensajitos flotantes) para informar al usuario de errores de forma más profesional.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Nociones básicas sobre librerías de terceros.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Instala una librería como <code>react-native-toast-message</code>.</li>
                <li>Sigue sus instrucciones de instalación: pon el componente principal <code>Toast</code> en tu archivo raíz (<code>App.tsx</code>), justo al final de todo el JSX.</li>
                <li>Crea un archivo utilitario <code>src/utils/errorHandler.ts</code> con una función <code>showError(message)</code>.</li>
                <li>Haz que esa función dispare un Toast rojo con el mensaje de error.</li>
                <li>Busca en todos tus catch() de Firebase y cambia los <code>Alert.alert()</code> por tu nueva función <code>showError()</code>.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Los códigos de error de Firebase son feos (ej. <code>auth/user-not-found</code>). Puedes crear un objeto o Switch en tu <code>errorHandler.ts</code> para traducir "auth/user-not-found" a "Usuario no encontrado" antes de mostrar el Toast.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al poner una contraseña mal aposta, aparece un mensaje flotante elegante en vez de una alerta molesta del sistema operativo.</li>
            </ul>
        `
    },
    {
        id: 17,
        block: 1,
        title: "Soporte Offline Básico",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Que la app avise al usuario visualmente cuando pierde internet y evitar que ciertas funciones se rompan.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>App funcionando.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Instala la librería oficial <code>@react-native-community/netinfo</code>.</li>
                <li>Crea un componente llamado <code>OfflineBanner.tsx</code> que sea una franja roja y diga "Sin conexión a Internet".</li>
                <li>En tu <code>App.tsx</code> (o en una pantalla superior), usa el hook <code>useNetInfo()</code> de la librería instalada.</li>
                <li>Si <code>netInfo.isConnected === false</code>, renderiza tu <code>OfflineBanner</code> en la parte superior de la pantalla absoluta (z-index alto).</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Firebase Firestore ya guarda las tareas en caché internamente, por lo que las tareas seguirán apareciendo aunque no haya internet. Lo único que tienes que aportar tú es este banner visual para que el usuario no se frustre si crea una tarea y no sube al servidor.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al apagar el WiFi o los datos del móvil mientras tienes la app abierta, aparece el cartel rojo arriba informándote.</li>
            </ul>
        `
    },
    {
        id: 18,
        block: 1,
        title: "Animaciones de Celebración",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Recompensar psicológicamente al usuario lanzando confetti en la pantalla cuando marque una tarea como completada.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Completar tareas funcional (Tarea 11).</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Instala la librería <code>lottie-react-native</code>.</li>
                <li>Entra en <a href="https://lottiefiles.com" target="_blank">LottieFiles</a>, busca "Confetti" y descarga un archivo en formato JSON gratuito.</li>
                <li>Pon ese JSON en <code>src/assets/animations/confetti.json</code>.</li>
                <li>Añade el componente <code>LottieView</code> en tu <code>HomeScreen</code> en posición absoluta por encima de la lista.</li>
                <li>Mantenlo oculto, y cuando se pulse el botón de completar tarea, pon su estado <code>isPlaying</code> a true temporalmente (usando un setTimeout de 2000ms para luego volver a ocultarlo).</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Lottie es magia. Permite tener animaciones complejas (como Gifs) pero sin pesar apenas nada. Asegúrate de configurar <code>loop={false}</code> en el componente para que no esté escupiendo confetti eternamente.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al darle al tick verde de una tarea, llueve confetti por la pantalla durante 2 segundos.</li>
            </ul>
        `
    },
    {
        id: 19,
        block: 1,
        title: "Edición de Tareas",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Poder tocar una tarea que ya creaste para modificar su título, descripción o fecha si te habías equivocado.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Componente de crear tarea finalizado.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Añade un manejador <code>onPress</code> al <code>TaskCard</code> entero (no al checkbox) para navegar a la pantalla <code>CreateTaskScreen</code>.</li>
                <li>Para diferenciarlos, pásale parámetros en la navegación: <code>navigation.navigate('CreateTask', { taskToEdit: tarea })</code>.</li>
                <li>En <code>CreateTaskScreen</code>, lee esos parámetros. Si existen, pon los valores iniciales de los inputs (useState) con los datos de esa tarea.</li>
                <li>Cambia el botón a "Actualizar Tarea" y haz que, al pulsar, en lugar de llamar a <code>addTask</code>, llame a una nueva función en Firebase <code>updateTaskDetails</code> usando <code>doc(tarea.id).update()</code>.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Aprovecha y recicla código. No crees una pantalla nueva para editar, usa la misma pantalla de "Crear" pero haciéndola inteligente para que sepa si está creando una nueva o editando una existente basándose en si recibió <code>route.params.taskToEdit</code>.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Toco una tarea en la lista, se abre el formulario relleno, cambio el título, guardo, y la lista refleja el cambio instantáneamente.</li>
            </ul>
        `
    },
    {
        id: 20,
        block: 1,
        title: "Revisión Bloque 1 y Limpieza",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Hacer una parada técnica. Asegurar que todo lo anterior funciona perfecto antes de empezar con funciones más complejas de IA o gráficas.</p>
            
            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tareas de la 1 a la 19 acabadas.</li>
            </ul>
            
            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Haz una revisión general (Code Review) en el equipo.</li>
                <li>Borra los archivos de ejemplo, variables que no se usan o los <code>console.log</code> que te dejaste olvidados probando cosas.</li>
                <li>Usa la herramienta Prettier o ESLint en tu editor para formatear todo el código de manera uniforme.</li>
                <li>Haz pruebas cruzadas: que Bamba intente romper la app de Josias, buscando si al dejar un campo en blanco la app crashea. Arregla esos posibles fallos de validación.</li>
            </ol>
            
            <h3>💡 Consejos</h3>
            <p>Un código limpio ahora te ahorrará horas de dolores de cabeza en el Bloque 2. Si un componente mide más de 200 líneas, es un buen momento para dividirlo.</p>
            
            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>El repositorio está limpio, los <code>console.log</code> eliminados, los fallos tontos controlados, y la base del Bloque 1 es sólida.</li>
            </ul>
        `
    },

    // BLOQUE 2 (Lógica Inteligente y Pulido)
    {
        id: 21,
        block: 2,
        title: "Sistema de Colores Dinámico",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Que la aplicación cambie su tema cromático (sus colores) dependiendo de cómo de estresado o tranquilo esté el usuario (según el estado de sus tareas).</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>La lista de tareas con fechas límites en el estado principal (Context o global).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea un custom hook llamado <code>useDynamicTheme.ts</code>.</li>
                <li>Dentro del hook, importa el array de tareas del usuario.</li>
                <li>Crea una función que itere sobre las tareas pendientes y compruebe si la fecha de entrega de alguna es hoy o está vencida (Urgente).</li>
                <li>Si hay más de 2 tareas urgentes, el hook debe retornar un objeto de tema en color <strong>Rojo/Naranja</strong>.</li>
                <li>Si no hay tareas urgentes y hay varias completadas, retornar un tema <strong>Verde/Azul</strong> (Relax).</li>
                <li>Si está intermedio, el tema base.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Un Custom Hook es básicamente una función JavaScript normal que puede usar otros Hooks de React por dentro (como useState o useEffect) y que devuelve datos (en este caso colores).</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Se ha programado la lógica capaz de detectar el nivel de urgencia y generar la paleta de color correspondiente.</li>
            </ul>
        `
    },
    {
        id: 22,
        block: 2,
        title: "Implementación Visual del Tema",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Conectar el hook recién creado en la Tarea 21 a los elementos visuales de la app para que los colores se apliquen de verdad.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tarea 21 terminada.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>En tu <code>App.tsx</code> o en un proveedor de Context, llama a <code>useDynamicTheme()</code> para obtener los colores actuales.</li>
                <li>Pasa esos colores hacia abajo usando Context.Provider.</li>
                <li>Abre el archivo donde defines tu TopBar o Header.</li>
                <li>Sustituye el color de fondo hardcodeado (ej. '#fff' o 'blue') por la variable que viene del Contexto (ej. <code>theme.headerBackground</code>).</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Para no tener que importar colores en 50 archivos distintos, considera usar una librería como <code>styled-components</code> o configurar los colores base en el <code>Theme</code> oficial de <code>React Navigation</code>.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Si tienes 3 tareas para hoy, la cabecera de la app se pone roja al instante. Si las borras o pospones, vuelve a la normalidad.</li>
            </ul>
        `
    },
    {
        id: 23,
        block: 2,
        title: "Algoritmo de Prioridad Inteligente",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>En lugar de ordenar la lista de tareas de más nueva a más vieja, la app debe calcular de forma inteligente qué es lo más urgente y ponerlo arriba del todo.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tareas con fecha límite.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea un archivo <code>src/utils/priorityAlgorithm.ts</code>.</li>
                <li>Escribe una función <code>sortTasksByPriority(tasks)</code>.</li>
                <li>La lógica de ordenación (método <code>.sort()</code> de arrays) debe considerar el tiempo restante. Tareas vencidas van las primeras, tareas para hoy las segundas, etc.</li>
                <li>Aplica esta función antes de pasar el array de tareas al <code>FlatList</code> en el HomeScreen.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Investiga cómo funciona el método <code>array.sort((a,b) => ...)</code> en JavaScript para comparar fechas de forma eficiente. Convertir las fechas a milisegundos (<code>getTime()</code>) suele facilitar la resta.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>La lista de la pantalla principal siempre tiene arriba las tareas que caducan antes, sin importar en qué orden se crearon.</li>
            </ul>
        `
    },
    {
        id: 24,
        block: 2,
        title: "Integración de Notificaciones Locales",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Hacer que el móvil suene y muestre una notificación push nativa cuando se acerque la hora límite de una tarea, incluso si la app está cerrada.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Móvil físico o emulador.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Instala la librería <code>@notifee/react-native</code>. Sigue su extensa guía de instalación en la web oficial (es importante no saltarse pasos).</li>
                <li>Solicita permisos al usuario para enviarle notificaciones en el <code>HomeScreen</code> cuando entra por primera vez (iOS).</li>
                <li>Crea una función <code>scheduleTaskNotification(task)</code>.</li>
                <li>Usa Notifee para programar un Trigger de tiempo (TimestampTrigger) usando la fecha de la tarea MENOS 30 minutos.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Las notificaciones locales no requieren servidores. Se quedan programadas en el sistema del propio móvil (AlarmManager en Android / UNUserNotification en iOS).</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Programas una tarea para dentro de 31 minutos. Cierras la app. En 1 minuto, el móvil vibra y te sale un aviso diciendo "¡Atención! La tarea XYZ caduca en media hora."</li>
            </ul>
        `
    },
    {
        id: 25,
        block: 2,
        title: "Notificaciones Inteligentes no Intrusivas",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Evitar volver loco al usuario. Si le caducan 5 tareas a las 18:00, no queremos enviarle 5 avisos seguidos a las 17:30, sino un solo aviso agrupado.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Notificaciones locales operativas (Tarea 24).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Antes de usar <code>notifee.createTriggerNotification</code>, obtén todas las notificaciones pendientes con <code>notifee.getTriggerNotifications()</code>.</li>
                <li>Comprueba si ya hay un aviso programado en un rango de +/- 15 minutos.</li>
                <li>Si es así, en lugar de añadir uno nuevo, cancela el existente y crea uno nuevo cuyo título sea: "Tienes varias tareas próximas a vencer".</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Esta lógica es engañosa. Tómate tu tiempo dibujando el diagrama de flujo en un papel antes de programarlo en código para entender los estados.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Creas 3 tareas para dentro de una hora. El móvil te envía un único mensaje consolidado y no tres.</li>
            </ul>
        `
    },
    {
        id: 26,
        block: 2,
        title: "Estadísticas de Productividad: Backend",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Para poder pintar gráficas de si el usuario trabaja bien o mal, primero necesitamos guardar la fecha exacta en la que terminó cada tarea en la base de datos.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Completado de tareas funcional (Tarea 11).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre la función <code>updateTaskStatus</code> en <code>taskService.ts</code>.</li>
                <li>Cuando el nuevo estado sea "completed", aparte de marcarla como completada, escribe un registro nuevo en una subcolección de Firebase: <code>/users/userId/logs</code>.</li>
                <li>En ese log, guarda el <code>taskId</code> y la fecha de hoy <code>new Date().toISOString()</code>.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Es mejor separar el histórico de actividad (logs) de la tarea en sí, para que al pintar la gráfica después no tengas que leerte TODA la base de datos de tareas, sino solo los últimos logs pequeñitos.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al marcar tareas completadas a lo largo del día, ves en Firebase Console que se van añadiendo documentos de "histórico/log" con la fecha de hoy.</li>
            </ul>
        `
    },
    {
        id: 27,
        block: 2,
        title: "Gráficos de Productividad: UI",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Añadir una pestaña "Estadísticas" en la app donde se pinte una gráfica de barras mostrando cómo de productivo fuiste cada día de la semana.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Logs de productividad creándose correctamente en Firestore (Tarea 26).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Añade la pestaña "Estadísticas" (StatsScreen) a tu TabNavigator.</li>
                <li>Instala una librería visual: <code>npm install react-native-chart-kit</code>.</li>
                <li>En <code>StatsScreen</code>, lee los <code>logs</code> de Firebase de los últimos 7 días.</li>
                <li>Agrupa esos logs por día (Ej: Lunes: 3, Martes: 0, Miércoles: 5).</li>
                <li>Pásale esos datos al componente <code>BarChart</code> de la librería para que se dibuje.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Agrupar datos en JS requiere recorrer arrays. Investiga cómo usar el método <code>reduce()</code> para contar objetos que tengan la misma fecha de calendario.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Se ve un gráfico de barras bonito. Si cambias la fecha del teléfono, añades tareas terminadas y vuelves, las barras reflejan la actividad realista.</li>
            </ul>
        `
    },
    {
        id: 28,
        block: 2,
        title: "Modelo de IA Ligero: Peak Time",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Crear un pequeño algoritmo matemático que analice tu histórico para detectar en qué franja horaria eres más eficiente completando tareas.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Logs agrupables de la Tarea 27.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea un servicio <code>src/services/aiRecommendationService.ts</code>.</li>
                <li>Extrae solo las "horas" (0 a 24) en las que se resolvieron los <code>logs</code> de la última semana.</li>
                <li>Averigua cuál es la franja de 3 horas que acumula más tareas resueltas (Ej: de 10:00 a 13:00).</li>
                <li>Exporta esta franja como el "Peak Time" (Pico de Productividad) del usuario.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>No te compliques con inteligencia artificial pesada de Machine Learning. Un algoritmo sencillo basado en la "moda" estadística (el valor que más se repite) es suficiente para un proyecto de este alcance.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>La función devuelve correctamente una cadena como "Mañana (10:00-13:00)" basándose en los datos insertados.</li>
            </ul>
        `
    },
    {
        id: 29,
        block: 2,
        title: "Recomendación UI con IA",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Usar el "Peak Time" calculado antes para sugerirle cosas al usuario en el momento adecuado, como si la app fuera su asistente.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Tener el Peak Time calculado de la Tarea 28.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>En <code>CreateTaskScreen</code>, cuando el usuario va a añadir una tarea, si la hora actual NO ES su Peak Time y marca la tarea como "Difícil", haz algo visual.</li>
                <li>Muestra un texto bajo el botón (Insight Card): "💡 Hemos notado que rindes mejor de 10 a 13. ¿Estás seguro de programar esta tarea dura a esta hora?"</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Este es el valor central de la app "Smart". Dar avisos sutiles contextualizados en los datos de comportamiento.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>El usuario ve el consejo de inteligencia artificial proactivo al intentar crear tareas difíciles fuera de su horario prime.</li>
            </ul>
        `
    },
    {
        id: 30,
        block: 2,
        title: "Sugerencias de Descanso Activo",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Cuidar de la salud mental del usuario (Wellbeing). Si trabaja demasiado sin parar, interrumpirlo.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Logs de Firestore activos.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>En <code>HomeScreen</code>, monitoriza cuántas tareas completa el usuario de golpe.</li>
                <li>Si la diferencia de tiempo entre completar 3 tareas seguidas es de menos de 1 hora, dispara un modal.</li>
                <li>El modal de pantalla completa (superpuesto) debe decir "¡Wow, estás a tope! Pero recuerda levantar la vista del móvil 5 minutos." y tener un botón de "Entendido".</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Para no frustrar al usuario, usa AsyncStorage para guardar un valor temporal que asegure que no le sacas este cartel de descanso más de 1 vez al día.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Marcar 3 tareas muy rápido levanta el cartel de wellbeing al instante.</li>
            </ul>
        `
    },
    {
        id: 31,
        block: 2,
        title: "Sincronización Google Calendar (Setup)",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Configurar el inicio de sesión con la cuenta de Google para obtener acceso al calendario oficial del usuario.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Perfil o Ajustes de usuario creados.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea un proyecto en <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a> y habilita la API de Google Calendar.</li>
                <li>Crea las credenciales OAuth para Android y para iOS en esa consola web.</li>
                <li>En tu app, instala la librería <code>@react-native-google-signin/google-signin</code>.</li>
                <li>Añade un botón en la pantalla Perfil de "Sincronizar mi Google Calendar".</li>
                <li>Programa el botón para que ejecute el método de Sign In de Google, solicitando los "scopes" (permisos) para leer eventos del calendario.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Esta es una de las tareas más difíciles a nivel de configuración de servidores y certificados SHA-1 en Android. Dedica tiempo a leer tutoriales de cómo configurar Google Sign In en React Native Firebase.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Al pulsar el botón, sale la ventana nativa del móvil pidiendo elegir una cuenta de Google y pidiendo permisos de calendario.</li>
            </ul>
        `
    },
    {
        id: 32,
        block: 2,
        title: "Sincronización de Eventos",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Usar el acceso conseguido en la tarea anterior para leer los eventos de hoy e inyectarlos en nuestra lista como si fueran tareas.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Google Calendar SignIn funcionando (Token extraído) (Tarea 31).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Con el accessToken obtenido, haz una petición HTTP tipo <code>fetch()</code> a la API de Google (<code>https://www.googleapis.com/calendar/v3/calendars/primary/events</code>).</li>
                <li>Recibirás un JSON masivo. Fíltralo para quedarte solo con los eventos de la fecha actual.</li>
                <li>Mapea (traduce) ese formato de evento al formato de nuestra interfaz <code>ITask</code>.</li>
                <li>Une esos eventos extra a tu array de tareas normales en la <code>FlatList</code> del HomeScreen.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Ponles un campo visual extra a estos eventos transformados, como por ejemplo cambiarles el fondo o ponerles una "G" al lado, para que el usuario sepa que no puede "completarlos" en nuestra app, ya que solo están de lectura.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Si hoy a las 17:00 tengo una reunión médica en Google Calendar, aparece en mi HomeScreen entre mis otras tareas de SmartTime.</li>
            </ul>
        `
    },
    {
        id: 33,
        block: 2,
        title: "Dark Mode Dinámico",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Que la app se vuelva oscura automáticamente para no dañar los ojos si el sistema operativo del teléfono está en modo nocturno.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>App visualizada.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Usa el hook nativo de React Native: <code>const colorScheme = useColorScheme()</code>.</li>
                <li>Define dos paletas de colores separadas en tu Theme (una Light y una Dark).</li>
                <li>Haz que tus componentes de fondo y texto lean de esa paleta elegida automáticamente.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Evita el color <code>#000000</code> (negro puro) para los fondos. En UI/UX modernas, los modos oscuros usan grises muy oscuros (ej. <code>#111827</code>) porque son mucho más agradables a la vista y facilitan ver las sombras de los botones.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Bajas la pestaña del móvil, activas el modo oscuro de iOS o Android, vuelves a la app y está completamente oscura.</li>
            </ul>
        `
    },
    {
        id: 34,
        block: 2,
        title: "Soporte de Accesibilidad (a11y)",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Hacer que nuestra aplicación pueda ser usada por personas con discapacidades visuales a través de los lectores de pantalla del móvil.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Todo el diseño finalizado.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Repasa todos tus componentes tipo <code>TouchableOpacity</code> y <code>Pressable</code>.</li>
                <li>Añade las props <code>accessible={true}</code>, <code>accessibilityRole="button"</code> y <code>accessibilityLabel="Pulsar para hacer tal cosa"</code> a cada uno.</li>
                <li>Enfatiza las imágenes poniéndoles etiquetas (alt text) también.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Abre las opciones de accesibilidad de tu propio móvil y activa VoiceOver o TalkBack. Intenta usar la app con los ojos cerrados escuchando lo que te lee el sistema. Si te frustras, arregla las etiquetas.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Una persona puede navegar desde login hasta crear una tarea utilizando únicamente el lector de pantalla por gestos.</li>
            </ul>
        `
    },
    {
        id: 35,
        block: 2,
        title: "Refactorización y Limpieza General",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Poner orden en el caos. Extraer lógica acumulada en los componentes de pantalla hacia archivos independientes antes de preparar el lanzamiento final.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Código funcional en el 90%.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Si tu <code>HomeScreen.tsx</code> tiene más de 250 líneas, corta la lógica de filtrar tareas a un archivo aparte (<code>useTasksFilter.ts</code>).</li>
                <li>Elimina importaciones de librerías que al final no utilizaste.</li>
                <li>Corre el linter de TypeScript: corrige todos los subrayados rojos y amarillos que te marque VSCode.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>El código no es solo para la máquina, es para los programadores del futuro. Asegúrate de comentar por qué hiciste ciertas lógicas complejas de la IA o de Firebase.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>El código compila sin ningún Warning ni Error de TypeScript. Todo está tipado correctamente.</li>
            </ul>
        `
    },
    {
        id: 36,
        block: 2,
        title: "Optimización de Rendimiento",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Asegurarse de que la aplicación vaya a 60 FPS (súper fluida) sin atascarse al hacer scroll vertical en una lista masiva de tareas.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Muchas tareas en la app.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Usa <code>React.memo()</code> envolviendo el componente <code>TaskCard</code> para que React no intente redibujarlo inútilmente.</li>
                <li>En la <code>FlatList</code> del HomeScreen, añade atributos de optimización como <code>initialNumToRender={10}</code>, <code>maxToRenderPerBatch={10}</code>, y <code>windowSize={5}</code>.</li>
                <li>Si tienes imágenes pesadas estáticas, optimízalas a tamaño reducido.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>En el menú de desarrollo del emulador (Ctrl+M o agitando el móvil) abre el "Perf Monitor". Asegúrate de que los FPS de UI y JS se mantengan fijos cerca de 60.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Creas 100 tareas de prueba, haces scroll hiper-rápido hacia abajo, y el móvil no da tirones ni se congela.</li>
            </ul>
        `
    },
    {
        id: 37,
        block: 2,
        title: "Icono de la App y Splash Screen",
        difficulty: "Fácil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Poner un logo profesional a la aplicación para sustituir el icono blanco por defecto que pone React Native en el cajón de aplicaciones del móvil.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Un archivo de logo en PNG de alta resolución (1024x1024).</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Usa una web como AppIcon.co o genera los iconos con Android Studio para obtener los diferentes tamaños y pegarlos en las carpetas nativas (<code>android/app/src/main/res/mipmap...</code>).</li>
                <li>Instala <code>react-native-bootsplash</code>.</li>
                <li>Genera la pantalla de carga (Splash Screen) inicial según los pasos de su documentación usando tu logo para ocultar el tiempo que tarda React Native en arrancar.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Esta tarea parece fácil pero tocar las carpetas nativas a veces asusta. Ten paciencia y asegúrate de reiniciar el servidor y desinstalar la app vieja del móvil para ver los cambios.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>El icono de la app en la pantalla del móvil es tu logo. Al abrirla, sale una pantalla con tu logo antes de cargar, en lugar de una pantalla blanca en blanco.</li>
            </ul>
        `
    },
    {
        id: 38,
        block: 2,
        title: "Entornos (Staging/Production)",
        difficulty: "Difícil",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Separar la base de datos de pruebas (la que usamos para programar y hacer tests) de la base de datos real que usarán los usuarios finales cuando publiquemos la app.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Código refactorizado.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Crea un proyecto NUEVO en Firebase llamado "SmartTimeManager-PROD".</li>
                <li>Instala <code>react-native-config</code> para manejar variables de entorno.</li>
                <li>Crea un archivo <code>.env.development</code> con las claves viejas y un <code>.env.production</code> con las claves del proyecto nuevo de Firebase.</li>
                <li>Cambia tu código de inicialización para que lea desde <code>Config.FIREBASE_API_KEY</code> etc., en lugar de usar cadenas de texto.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Esto evitará el terrorífico error de "borrar sin querer las cuentas de usuarios reales porque estabas haciendo pruebas en tu ordenador".</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Puedes cambiar de entorno usando un comando de terminal distinto, apuntando a un Firebase u otro.</li>
            </ul>
        `
    },
    {
        id: 39,
        block: 2,
        title: "Generación de Bundles (AAB/IPA)",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Compilar y empaquetar todo nuestro código en un único archivo binario que las tiendas de aplicaciones entienden.</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Entorno de producción listo y testeado sin fallos.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Para Android: Sigue la guía oficial para generar un <strong>Upload Keystore</strong> (un archivo de seguridad) con Java <code>keytool</code>. Luego mételo en Android Studio y ejecuta en terminal: <code>cd android && ./gradlew bundleRelease</code>. Esto te dará un archivo <code>.aab</code>.</li>
                <li>Para iOS: Abre Xcode, asegúrate de tener los certificados de Apple Developer (de pago) descargados, selecciona dispositivo "Any iOS Device" y haz "Product -> Archive".</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>¡Guarda ese archivo Keystore (el archivo <code>.jks</code> en Android) como oro en paño! Si lo pierdes, Google Play nunca te dejará volver a actualizar esta aplicación.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Tienes físicamente el archivo <code>.aab</code> (Android) en la carpeta de build listo para subir.</li>
            </ul>
        `
    },
    {
        id: 40,
        block: 2,
        title: "Despliegue a TestFlight / Google Play",
        difficulty: "Media",
        description: `
            <h3>🎯 Objetivo</h3>
            <p>Enviar la aplicación empaquetada a las tiendas oficiales para que el resto del equipo la instale en sus móviles de forma "oficial".</p>

            <h3>📋 Requisitos previos</h3>
            <ul>
                <li>Archivos binarios generados en Tarea 39.</li>
                <li>Cuentas de desarrollador en Google y Apple pagadas.</li>
            </ul>

            <h3>🔧 Pasos detallados</h3>
            <ol>
                <li>Abre la <a href="https://play.google.com/console" target="_blank">Google Play Console</a>, crea una aplicación y sube tu archivo AAB a la sección de "Pruebas Internas" (Internal Testing).</li>
                <li>Añade los emails del equipo a la lista de probadores y pásales el enlace.</li>
                <li>En Apple, sube el Archive a App Store Connect mediante el programa Transporter. Abre TestFlight en la web y añade a los usuarios a un grupo interno para que les llegue un correo.</li>
            </ol>

            <h3>💡 Consejos</h3>
            <p>Google y Apple pueden tardar unas horas en procesar los archivos que les subes. No te desesperes si subes la app y no aparece disponible para descarga de inmediato.</p>

            <h3>✅ Criterios de aceptación</h3>
            <ul>
                <li>Cualquier miembro del equipo, desde el enlace de prueba, puede instalar la app en su propio móvil físico sin cables conectados y usarla conectada al Firebase real.</li>
            </ul>
        `
    }
];

if (typeof window !== 'undefined') {
    window.projectTasks = projectTasks;
} else if (typeof module !== 'undefined') {
    module.exports = projectTasks;
}
