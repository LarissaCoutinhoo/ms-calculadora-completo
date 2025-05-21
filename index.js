const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/', async (req, res) => {
  const { a, b, operacao } = req.body;
  const operacoes = {
    soma: 'https://ms-soma.vercel.app',
    subtracao: 'https://ms-subtracao.vercel.app',
    multiplicacao: 'https://ms-multiplicacao.vercel.app',
    divisao: 'https://ms-divisao.vercel.app'
  };

  const url = operacoes[operacao];
  if (!url) return res.status(400).json({ erro: 'Operação inválida' });

  try {
    const resposta = await axios.post(url, { a, b });
    res.json({ resultado: resposta.data.resultado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao calcular' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});