import React from 'react';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CloseIcon from '@mui/icons-material/Close';

function QuestionsHeader() {

  const [questions, setQuestions]= React.useState([{questionText: "Question", options : [{optionText: "option 1"}], open: false}]);
  
  function addMoreQuestionField(){
      expandCloseAll();
      setQuestions(questions=> [...questions, {questionText: "Question", options : [{optionText: "option 1"}], open: true}]);
  }

  function addOption(i){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length < 5){
      optionsOfQuestion[i].options.push({optionText: "option gg"})
    } else{
      console.log("Max  5 options ");  
    }
    setQuestions(optionsOfQuestion)
  }

  function removeOption(i, j){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length > 1){
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
      console.log(i + "__" + j);
    }   
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ==j ){
        qs[j].open = true;
      } else{
        qs[j].open = false;
       }
    }
     setQuestions(qs);
  }

  function questionsUI(){
    return  questions.map((ques, i)=> (

      <div key={i}>
                      <Draggable key={i} draggableId={i} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                             <div style={{marginBottom: "9px"}}>
          
          <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
            <AccordionSummary            
              aria-controls="panel1a-content"
              id="panel1a-header"
              elevation={1} style={{width:'100%'}}
            >
              { !questions[i].open ? (
            <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '0px', paddingTop: '20px', paddingBottom: '20px'}}>
              <Typography variant="subtitle1">Form description {i+1}</Typography>
              
                <FormControlLabel disabled control={<Radio />} label="Option 1" />                                        
            </div>            
            ): ""}   
            </AccordionSummary>


            <AccordionDetails>

            <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', marginTop:'-15px'}}>
              
              <Typography variant="subtitle1">Form description {i+1}</Typography>
              
              <div style={{width: '100%'}}>
              {ques.options.map((op, j)=>(
               <div key={j} style={{display:'flex', flexDirection:'row', marginLeft:'-13px'}}>

                  <Radio disabled /> 
                  <TextField fullWidth={true} placeholder="Option text" style={{marginTop: '5px'}} />  
                  
                  <IconButton aria-label="delete">
                    <CropOriginalIcon />
                  </IconButton>

                  <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                    <CloseIcon />
                  </IconButton>

               </div>
                
              ))}  
              </div>  
              
              
              <FormControlLabel disabled control={<Radio />} label={
                <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none', marginLeft:"-5px"}}>
                  Add Option
                </Button>
              } /> 

             

                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
            </div>
            
            </AccordionDetails>
          </Accordion>
        </div>
                           
                          </div>
                        )}
                      </Draggable>
         
      </div>
     )
    )
  }

  return (
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {questionsUI()}
            <div>
              <button onClick={addMoreQuestionField}>Add question</button>
            </div>
          </div>
  );
}
export default QuestionsHeader