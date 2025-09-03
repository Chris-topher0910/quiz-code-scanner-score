function doGet() {
  const formId = 'SEU_FORM_ID_AQUI'; // Substitua pelo ID do seu formulário
  const form = FormApp.openById(formId);
  const items = form.getItems();
  
  // Mapeamento das respostas corretas baseado no título da pergunta
  const correctAnswers = {
    'QUAL DESSES É UM PERIFÉRICO DE ENTRADA?': 2, // WEBCAM (CÂMERA)
    'QUAL É A DEFINIÇÃO DE HARDWARE?': 0, // Hardware é a parte física do computador e de outros dispositivos eletrônicos
    'NA ARQUITETURA DOS COMPUTADORES, QUAL COMPONENTE É RESPONSÁVEL PELA MEMÓRIA TEMPORÁRIA?': 2, // RAM
    'QUAL O FATOR QUE MOTIVOU A CRIAÇÃO DA ARPANET PELO GOVERNO DOS EUA?': 2, // Guerra Fria
    'QUAL O ORGÃO RESPONSÁVEL PELA CRIAÇÃO DA ARPANET?': 3, // DARPA
    'NO CMD, QUAL O COMANDO RESPONSÁVEL POR MOSTAR O IP DO COMPUTADOR': 2, // ipconfig
    'NO CMD, QUAL O COMANDO RESPONSÁVEL POR PROGRAMAR O DESLIGAMENTO DO COMPUTADOR?': 1, // shutdown -s -t
    'NO CMD, QUAL O COMANDO RESPONSÁVEL POR MOSTRAR O HISTÓRICO DO ROTEADOR?': 0, // arp -a
    'NO CMD, QUAL O COMANDO RESPONSÁVEL POR LIMPAR O HISTÓRICO DO ROTEADOR?': 4, // /flushDNS
    'QUAL DESSES É UM PROGRAMA OPERACIONAL?': 4, // EXPLORER
    'QUAL A DEFINIÇÃO DE SOFTWARE?': 0, // Software é a parte lógica do computador, composta por programas
    'QUAL DAS SEGUINTES OPÇÕES É UTILIZADA PARA ALTERAR A APARÊNCIA DO TEXTO SELECIONADO, COMO O TIPO DE LETRA, TAMANHO E COR?': 1, // Ferramenta de Formatação de Fonte
    'QUAL É A FUNÇÃO DO COMANDO "QUEBRA DE SEÇÃO" NO WORD?': 1, // Iniciar uma nova página com formatação distinta da anterior
    'O QUE SIGNIFICA O TERMO "CABEÇALHO" EM UM DOCUMENTO DO WORD?': 1, // Uma área no topo de cada página, usada para informações de orientação
    'QUAL A DIFERENÇA ENTRE "SALVAR" E "SALVAR COMO"?': 1, // "Salvar" atualiza o arquivo existente com as últimas alterações, enquanto "Salvar como" permite salvar o documento com um novo nome
    'PARA QUE SERVE O RECURSO "HIFENIZAÇÃO" NO WORD?': 1, // Para dividir palavras no final das linhas, quando necessário
    'Qual a função da opção "Visualizar Impressão"?': 1, // Mostra como o documento ficará após ser impresso
    'O QUE SÃO "NOTAS DE RODAPÉ" E "NOTAS DE FIM"?': 1, // São textos explicativos ou referências que aparecem na parte inferior da página
    'QUAL O PROPÓSITO DE USAR "COLUNAS" EM UM DOCUMENTO DO WORD?': 1, // Para organizar o texto em blocos verticais
    'O QUE O RECURSO "CONTROLE DE ALTERAÇÕES" (TRACK CHANGES) PERMITE FAZER?': 1 // Registrar todas as modificações feitas em um documento
  };
  
  const questions = [];
  
  items.forEach((item, index) => {
    if (item.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
      const multipleChoiceItem = item.asMultipleChoiceItem();
      const choices = multipleChoiceItem.getChoices();
      const questionTitle = item.getTitle();
      
      // Busca a resposta correta no mapeamento
      const correctAnswer = correctAnswers[questionTitle] || 0;
      
      const questionData = {
        id: `question_${index}`,
        question: questionTitle,
        options: choices.map(choice => choice.getValue()),
        correctAnswer: correctAnswer,
        points: 10
      };
      
      questions.push(questionData);
    }
  });
  
  const response = {
    questions: questions,
    formTitle: form.getTitle(),
    totalQuestions: questions.length
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}