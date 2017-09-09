### Персональный сайт Ровного А.В. пробы и доработки. Интерфейс от Windows
### Для начала работы следует не забыть поставить компоненты: ###
Windows:
npm install &&  bower prune && bower install --global

npm install -g gulp bower;
npm install &&  bower prune && bower install
bower update

### Прописываем в хостах!!! ###
(для win - открываем блокнот от имени администратора C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 rovniy.local

### В проекте настроен локальный фронт сервер (бек от девелоперского окружения kaskonomika.ru), запускается простой командой: ###
gulp 

### Сборка JS компонентов(из bower) происходит через команду: ###
gulp js-vendor // --> ./sites/src/js/vendor.js

### Фронты работают теперь на rovniy.local:9360
