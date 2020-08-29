const chatbot = require('../chatbot/chatbot');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({'Hello': 'John'});
  });

  app.post('/api/df_text_query', async (req, res) => {
    console.log(req); 
    let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);  
    res.send(responses[0].queryResult);
  });

  app.post('/api/df_event_query', async(req, res) => {
    console.log(req.body)
    try {
      let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);  
      res.send(responses[0].queryResult);
    } catch(error){
      console.log(error)
      res.status(400).json({message : 'eror occured'})
    }

  });
}