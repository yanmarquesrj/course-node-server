const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');

//helper

//Busca ano atual
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//uppercase
hbs.registerHelper('textUpperCase', (text) => {
  return text.toUpperCase();
});

var app = express();
app.set('view engine', 'hbs');

//before reload page
app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url} \n`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
      if(err){
        console.log(err);
      }
    });
  next();
});


// app.use( (req, res, next) => {
//   res.render('manutencao.hbs');
// });

//static html
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    pageTitle: 'Home Title',
    subTitle: 'home sub title'
  })
});

app.get('/sobre', (req, res) => {
    res.render('sobre.hbs', {
      pageTitle: 'Sobre o Página'
    });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Page Project',
    pageTitle: 'Page Project'
  });
});

app.listen(port, () => {
  console.log(`Server connect in port ${port}`);
});








// Fala mano, beleza?
// Deixa eu te atualizar das paradas que aconteceram recentemente.
// A coordenadora lá da Oi, ela realmente se interessou bastante pelo beRap, e não apenas isso, ela quer formatar
// nossa apresentação, plano de negócio, plano de ação para captar investimentos.
//
// Ela foi contra recomeçarmos os torneios no whatsapp, e desenvolvimento do app (tendo em visto tempo disponível), ela
// acha que o desenvolvimento do site já mostra a capacidade de execução e que tem muitas startup com menos números
// e menos produto desenvolvidos que conseguem captar investimento anjo.
//
// Nós conversamos sobre todos os pontos com ela, inclusive equipe. Falamos da formalização e do meu dia a dia com Chrstian
// e fomos bem abertos sobre nosso contato com você. Ela disse que pla experiência dela, trazer alguém pra equipe como
// parte societária com um custo de 3K para ficar full time seria algo bem dificil de compreensão por parte do investidor
// quando o membro tem 19 anos e pouco tempo de carreira.
// porq eles querem investir no produto e a equipe tem que dar um jeito de viver com o mínimo se acredita na ideia.
//
// O negócio é que existem 2 possibilidades, Você se juntar a equipe mas conseguir reduzir esse custo pra 1.800 pelo menos
// Ou se você acha que não possível a gente se conseguir um investimento anjo a gente meio que te paga, você como um profissional
// autônomo pra se juntar com a gente, ai talvez consigamos esse valor ou próximo com o investidor.
//
// De qualquer forma, o investimento não vai acontecer da noite pro dia, então se tu acha que uma das duas valha a apena
// tu poderia se aprofundar um pouco em back end, eu to fazendo isso tmb, comprei uns 2 cursos, to fazendo algumas horas por dia.
// Eai mano, acho que tu tinha que tirar um tempo pra pensar, antes de responder.
// Porq realmente essa aceleração veio pra mudar o beRap de projeto pra Startup, e contratos e comprometimento
// terão que rolar, inclusive ela quer que eu atualize o meu contrato com Chrstian sobre assuntos mais profundos
// como caso alguém morrer rs
