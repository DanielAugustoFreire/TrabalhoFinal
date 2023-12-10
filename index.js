import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

const HOST = '0.0.0.0';
const PORT = 3000;

var lista_usuarios = [];
var lista_mensagens = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(),`src`)));


app.post(`/cadastrarusuario`, (req,res) => {

    var conteudo = ``

    var checker = true;

    if(req.body.nome_completo.length <= 4){
        checker = false;
        conteudo = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
            p {
                color: red;
            }
            </style>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        </head>
        <body style="display: flex;
                    padding: 10%;
                    justify-content: center;
                    "
        >
        
            <div class="container bg-secondary p-md-5">    
                <form action="/cadastrarusuario" method="POST" novalidate>
                <div class="form-group">
                <label for="nome_completo">Nome Completo</label>
                <input type="text" class="form-control" id="nome_completo" value="${req.body.nome_completo}" name="nome_completo">
                <p>O Nome Precisa ter no minimo 5 letras</p>`
    }
    else{

        conteudo = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
            p {
                color: red;
            }
            </style>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        </head>
        <body style="display: flex;
                    padding: 10%;
                    justify-content: center;
                    "
        >
        
            <div class="container bg-secondary p-md-5">    
                <form action="/cadastrarusuario" method="POST" novalidate>
                <div class="form-group">
                <label for="nome_completo">Nome Completo</label>
                <input type="text" class="form-control" id="nome_completo" value="${req.body.nome_completo}" name="nome_completo">`
    }
    if(req.body.data_nascimento == ''){
        checker = false;
        conteudo+=  ` </div>
        <div class="form-group">
            <label for="data_nascimento">Data de Nascimento</label>
            <input type="date" class="form-control" id="data_nascimento" value="${req.body.data_nascimento}" name="data_nascimento">
            <p>Preencha este campo</p>`
    }
    else{
        conteudo+=  ` </div>
        <div class="form-group">
            <label for="data_nascimento">Data de Nascimento</label>
            <input type="date" class="form-control" id="data_nascimento" value="${req.body.data_nascimento}" name="data_nascimento">`        
    }
    if(req.body.nick.length < 5){
        checker = false;
        conteudo+=`
        </div>
        <div class="form-group">
            <label for="nick">NickName</label>
            <input type="text" class="form-control" id="nick" value="${req.body.nick}" name="nick">
            <p>O nickname precisa ter no minimo 5 letras</p>
        `
    }
    else{
        conteudo+=`      </div>
        <div class="form-group">
            <label for="nick">NickName</label>
            <input type="text" class="form-control" id="nick" value="${req.body.nick}" name="nick">`
    }
    conteudo +=`  </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
                </div>

                <script>

                </script>

                <script src="https://st kpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
                </body>
                </html>`;



    if(!checker)
    {
        res.send(conteudo);
    }
    else{
        const usuario = {
            nome: req.body.nome_completo,
            data: req.body.data_nascimento,
            nickname: req.body.nick
        }       
        
        lista_usuarios.push(usuario);

        res.redirect(`/listar`);
    }

});

app.get(`/listar`, (req,res) => {
    let conteudo = `    <style>
body {
    font-family: Arial, sans-serif;
}

h1 {
    color: #333; /* Altere a cor conforme necessário */
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px; /* Ajuste conforme necessário */
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2; /* Cor de fundo para cabeçalho */
}

/* Estilizar linhas alternadas */
tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* Cor de fundo para linhas pares */
}
a {
    display: inline-block;
    padding: 10px;
    margin-top: 10px; /* Ajuste conforme necessário */
    text-decoration: none;
    color: #fff; /* Cor do texto dos links */
    background-color: #007bff; /* Cor de fundo dos links */
    border-radius: 5px; /* Borda arredondada */
    transition: background-color 0.3s ease; /* Efeito de transição suave */
}

a:hover {
    background-color: #0056b3; /* Cor de fundo ao passar o mouse */
}
</style> <body  style="font-family: Arial, sans-serif;">
<h1>Lista de usuario cadastrados</h1>
<table>
    <thead>
        <tr>
            <th>Nome Completo</th>
            <th>Data de Nascimento</th>
            <th>Nickname</th>
        </tr>
    </thead>
    <tbody> `;

for (const usuario of lista_usuarios){
    conteudo += `<tr>
                    <td>${usuario.nome}</td>
                    <td>${usuario.data}</td>
                    <td>${usuario.nickname}</td>
                <tr>
    `;
}
app.use(express.static(path.join(process.cwd(),`src`)))

conteudo+=
`            </tbody>
</table>
<a href="/">Voltar ao menu</a>
<a href="/cadastro.html">Continuar cadastrando</a>
    </body>
`;
    
res.end(conteudo);
});

app.post(`/enviarmensagem`, (req,res) => {

    var conteudo = ``;

    if(req.body.user == undefined)
    {
        conteudo += `<!DOCTYPE html>
        <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="batepapo.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <title>Zap-Zap</title>
        </head>
        <body>
        
        
        
            <section class="container">
        
                <div class="menu">
        
                    <a href="/"><img src="zap (1).png" alt="ZAP"></a>
                </div>
        
                <section class="chat">
                    
                     <section class="chat_messages">
        
                        <div class="message">
                            <span class="user">Daniel Augusto</span>                    
                            Eu sou daniel augusto freire de almeida santana e desejo fazer parte dessa bagaca
                        </div>     
                    
                     </section>   
        
                    <form action="/enviarmensagem" method="POST" class="chat_formulario">
                        <select style="border: 1px solid red" name="user" id="user" onfocus="removeRedBorder()">
                            <option value="" disabled selected>Selecione um usuário</option>`
                        
                            for(let users of lista_usuarios)
                            {
                                conteudo += `<option value="${users.nickname}">${users.nickname}</option>`
                            }

                        
                        conteudo +=     `</select>
                        <input type="text" class="chat_input" placeholder="Digite uma Mensagem" name="message">
                        <button type="submit" class="chat_button">
                            <span class="material-symbols-outlined">
                                send
                            </span>
                        </button>
        
                    </form>
                </section>                

            </section>
        
            <script>
        var obj = document.querySelector('.chat_messages');
        obj.scrollTop = obj.scrollHeight - obj.clientHeight;
        
        function removeRedBorder() {
            document.getElementById('user').style.border = '1px solid #ccc'; // Voltar para a cor padrão
          }
            </script>
        </body>
        </html>`
        res.end(conteudo);
    }
    else
    {
        const mensagem = {
            usuario: req.body.user,
            mensagem: req.body.message
        }
        console.log(mensagem)    
        
        
    }
















});

app.get(`/batepapo`, (req,res) => {

    var conteudo = ``;

    conteudo += `<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="batepapo.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <title>Zap-Zap</title>
    </head>
    <body>
    
    
    
        <section class="container">
    
            <div class="menu">
    
                <a href="/"><img src="zap (1).png" alt="ZAP"></a>
            </div>
    
            <section class="chat">
                
                 <section class="chat_messages">
    
                    <div class="message">
                        <span class="user">Daniel Augusto</span>                    
                        Eu sou daniel augusto freire de almeida santana e desejo fazer parte dessa bagaca
                    </div>     
                
                 </section>   
    
                <form action="/enviarmensagem" method="POST" class="chat_formulario">
                    <select  name="user" id="user" onfocus="removeRedBorder()">
                        <option value="" disabled selected>Selecione um usuário</option>`
                    
                        for(let users of lista_usuarios)
                        {
                            conteudo += `<option value="${users.nickname}">${users.nickname}</option>`
                        }

                    
                    conteudo +=     `</select>
                    <input type="text" class="chat_input" placeholder="Digite uma Mensagem" name="message">
                    <button type="submit" class="chat_button">
                        <span class="material-symbols-outlined">
                            send
                        </span>
                    </button>
    
                </form>
            </section>                

        </section>
    
        <script>
    var obj = document.querySelector('.chat_messages');
    obj.scrollTop = obj.scrollHeight - obj.clientHeight;
    
    function removeRedBorder() {
        document.getElementById('user').style.border = '1px solid #ccc'; // Voltar para a cor padrão
      }
        </script>
    </body>
    </html>`
    res.end(conteudo);
});


app.get(`/`, (req,res) => {

    res.send(`<!DOCTY   PE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Menu</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #333333;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }

            header {
                background-color: #25d366;
                padding: 20px;
                text-align: center;
                color: #fff;
            }

            nav {
                display: flex;
                justify-content: space-around;
                background-color: #444444    ;
                padding: 15px;
            }

            nav a {
                color: #fff;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-weight: bold;
                transition: background-color 0.3s;
            }

            nav a i {
                font-size: 24px;
                margin-bottom: 5px;
            }

            nav a:hover {
                background-color: #128C7E;
            }

            main {
                flex-grow: 1;
                padding: 20px;
            }

            footer {
                background-color: #000;
                color: #fff;
                padding: 10px;
                text-align: center;
            }
        </style>
    </head>
    <body>

        <header>
        <a href="/"><img style="    width:50px;
        height: auto;
        display: block;
        margin: 0 auto;" src="zap (1).png" alt="Descrição da imagem"></a>
        </header>

        <nav>
            <a href="/batepapo">
                <i class="fas fa-comment"></i>
            </a>
            <a href="cadastro.html">
                <i class="fas fa-user-plus"></i>
            </a>
        </nav>

        <main>
            <!-- Conteúdo da página vai aqui -->
        </main>

        <footer>
            &copy; 2023 Zap<br>
            <a style="font-size: xx-small;" href="https://www.flaticon.com/br/icones-gratis/zap" title="zap ícones">Zap ícones criados por Freepik - Flaticon</a>
        </footer>

    </body>
    </html>`);
});

app.listen(PORT, HOST, () => {
    console.log(`Rodando em ${HOST}:${PORT}`);

});