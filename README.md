
## Mobile app for Monitoring Health System for IDQBRN.

## Configurações
Para executar, deve-se ter instalado o "node" e o "npm".

Primeiramente, deve ser utilizado o seguinte comando:
> npm install

## Funcionamento

Para iniciar o servidor, abra um novo terminal na pasta "backend" do repositório encontrado em [https://github.com/srmacario/idqbrn](https://github.com/srmacario/idqbrn)  e execute o seguinte comando:
> node server.js

Este comando irá iniciar a conexão com o Banco de Dados no Atlas MongoDB.

Uma vez terminado o download, para iniciar a execução do mobile app, utilize:
> expo start

Após ver o IP local no terminal (representado por '172.15.1.14'), altere as variáveis IP_PORT nos dois arquivos demonstrados abaixo:
![image](https://user-images.githubusercontent.com/53433382/175999611-ce7a5de5-af4f-4d5f-a060-991e09c48f37.png)
![ip_info](https://user-images.githubusercontent.com/53433382/175996733-ee3f5e1b-e59a-4954-8f07-13523d8bf00d.jpeg)
![ip_home](https://user-images.githubusercontent.com/53433382/175996743-515d2f33-8533-4bb1-a770-e35f579cfa32.jpeg)

A partir de agora, o aplicativo está pronto para uso, para utilizá-lo, basta scannear o QRCode fornecido, como mostra a figura abaixo:

![qrcode](https://user-images.githubusercontent.com/53433382/175996739-694a17a5-99ed-4a66-99e5-3a2656266de7.jpeg)

Uma página inicial para solicitar a localização será carregada, aguarde até que esteja totalmente carregada:

<img src="https://user-images.githubusercontent.com/53433382/175995203-cabedcfe-2507-4c75-8ee2-f1a6914dda4d.jpeg" width=30% height=30%>

Uma soliticitação para acessar a localização do celular aparecerá na tela, é imprescindível que seja AUTORIZADO:

<img src="https://user-images.githubusercontent.com/53433382/175995671-04f043dc-3894-4e0c-af9a-13c7cebfb086.jpeg" width=30% height=30%>

Após permitido, uma página com a lista de doenças, com frequências baseadas em uma área próxima a sua localização atual será mostrada:

<img src="https://user-images.githubusercontent.com/53433382/175994242-f3365411-c3a7-44c9-b014-19350a25793c.jpeg" width=30% height=30%> <img src="https://user-images.githubusercontent.com/53433382/175994260-4d14dbdf-c158-448f-9974-7b6f61979540.jpeg" width=30% height=30%>

O usuário poderá clicar no botão de localizar a qualquer momento, atualizando sua posição.

Para ver uma informação de uma determinada doença, basta clicar na doença desejada, onde será redirecionado para outra página:

<img src="https://user-images.githubusercontent.com/53433382/175997604-db1eda11-bcda-40f8-9d8c-d7003293b7ac.jpeg" width=30% height=30%>
