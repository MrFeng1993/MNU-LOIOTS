set module=%1
set version=0.0.1
if exist ../%module%/%module%.jar (
   echo "File %module%.jar exists."
   set modulejarname=%module%.jar
) else (
   echo "File %module%.jar does not exist."
)
set scriptDir=%cd%
cd ..
set rootDir=%cd%
cd %scriptDir%

echo "file %modulejarname%"
echo java -agentlib:jdwp=transport=dt_socket,server=y,address=8000,suspend=n -jar %module%/%modulejarname%

if exist %rootDir%/%module%/application.properties (
   java -Xmx%2 -Ddruid.logType=slf4j -Dsun.net.maxDatagramSockets=65535 -jar ../%module%/%modulejarname% --spring.config.location=%rootDir%/%module%/application.properties
) else (
   java -Xmx%2 -Ddruid.logType=slf4j -Dsun.net.maxDatagramSockets=65535 -jar ../%module%/%modulejarname%
)