# Instalación local en macOS Apple Silicon

Fork: https://github.com/davidbau22/jobs-auto-apply
Original: https://github.com/manoj-ambatii/jobs-auto-apply

## Herramientas instaladas

Node.js 24.22.1 y npm 11.19.1 están en `.tools/node/`.
GitHub CLI 2.103.0 está en `.tools/gh/`.
Las dependencias se instalaron desde package-lock.json con `npm ci --ignore-scripts`.
Chromium de Playwright está en `.local/browsers/`.
No se requiere cambiar el PATH global: `run-local.sh` configura el entorno.

## Paso 1: verificar desde Terminal

En la carpeta del proyecto:

```sh
./run-local.sh check
./run-local.sh help
./run-local.sh stats
```

`check` abre Chromium en segundo plano y renderiza una página local; no accede a LinkedIn.
La prueba debe terminar con `Installation OK. No applications sent.`
La sesión de Codex puede impedir lanzar Chromium por las restricciones de procesos de macOS
(`MachPortRendezvousServer: Permission denied`). En ese caso ejecuta el comando en Terminal.

## Paso 2: iniciar sesión manualmente

```sh
./run-local.sh login
```

Se abre el Chromium instalado. Inicia sesión en LinkedIn y completa cualquier verificación
manualmente. Cierra la ventana cuando hayas terminado. Se guarda la sesión en
`.browser-profile/default-session/`, el mismo directorio que utiliza el flujo original.
Este comando no busca empleos, completa formularios ni envía solicitudes.
No es necesario guardar la contraseña de LinkedIn en `.env`.
Si una ejecución futura pierde la sesión, vuelve a usar `login`.

## Paso 3: preparar el perfil antes de postular

Esta etapa está pendiente. El repositorio original incluye datos, respuestas y CV de su autor.
Todavía NO se debe ejecutar `apply`, `apply:linkedin` ni `apply:all`.

Antes de la primera postulación:

- Reemplazar el perfil de ejemplo por datos reales del candidato.
- Guardar el CV personal en `resume/personal/cv.pdf` (ignorado por Git).
- Adaptar preguntas, salario, moneda, ubicación e idioma a Colombia.
- Revisar filtros de cargos: el código original contiene listas fijas de tecnologías y empresas.
- Revisar el límite de postulaciones y el comportamiento de la opción `--no-cap`.
- Verificar los selectores y la confirmación de envío con una vacante concreta.

La integración de LinkedIn no requiere Gemini ni Gmail. Naukri y portales externos quedan
fuera de esta primera etapa. No se ha registrado el MCP en ningún cliente; la CLI funciona
por separado. El proyecto ya incluye `@playwright/mcp` entre sus dependencias.

## Git y datos locales

`origin` apunta al fork y `upstream` al repositorio original.
`.tools/`, `.local/`, `.env`, `.browser-profile/`, `data/` y `resume/personal/` están ignorados.
La autenticación de GitHub se guarda localmente bajo `.local/gh/`; trata toda esa carpeta
como información privada y no la compartas. No publiques cookies, credenciales ni tu CV.

```sh
./run-local.sh gh repo view
./run-local.sh npm run tracker:stats
```

## Comprobaciones y limitaciones iniciales

La CLI y las dependencias cargan correctamente. El registro inicial contiene cero postulaciones.
La auditoría npm reporta una vulnerabilidad alta heredada en `xlsx@0.18.5`, sin actualización
correctiva disponible mediante npm. Revisar o reemplazar esa dependencia antes de importar
hojas de cálculo no confiables. Los detalles de la auditoría están en `.local/npm-audit.json`.
La apertura real del navegador debe validarse desde Terminal si la sesión de Codex la bloquea.
