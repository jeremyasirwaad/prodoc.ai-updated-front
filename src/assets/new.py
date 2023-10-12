import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline 

model_name = "Open-Orca/Mistral-7B-OpenOrca"
adapters_name = "ashwinpreyan/percival-new"

device = "cuda" if torch.cuda.is_available() else "cpu"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
   # load_in_4bit=True,
    torch_dtype=torch.bfloat16,
    device_map='auto'
)
model = PeftModel.from_pretrained(model, adapters_name)
model = model.merge_and_unload()
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.bos_token_id = 1

stop_token_ids = [0]


pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.7,
    top_p=0.95,
    top_k=40,
    repetition_penalty=1.1
)

prompt = '''Creatinine ,Serum 1.30 mg/dL 0.1 - 1.25
GFR (Glomerular Filtration Rate) mL/min 90 - 140 ml/min
CKD-EPI formula
60.6
  Remarks                                Reference Range              Units
Normal                                       70 and More                  ml/min
Mild Kidney Failure                  Less than 70                   ml/min
Moderate Kidney Failure        Less than 60                   ml/min
Severe Kidney Failure              Less than 30                   ml/min
End Stage Kidney Failure        Less than 15                   ml/min
BIOCHEMISTRY / IMMUNOASSAY
Test Result Unit Biological Ref. Interval
Dr.Kannan Sivaraj
M.D. Path (CMC Vellore), D.N.B
Path, DipRCPath (UK)
Ref. ID :
Corporate : VR DIAGNOSTICS SRF ID :
Col Dt. Time 28-Jul-2023 10:04 Recv Dt. Time : 28-Jul-2023 10:04 Sample Type : Serum
Reg Dt. Time : 28-Jul-2023 10:01 Report Released @ :
:
28-Jul-2023 11:59
:
57 Years
Final Laboratory Report PID :
Name : Mr Prakash Babu
Ref. By
Lab ID 2384021683
DOB: Passport No : - Sex/Age : Male /
:
Page 1 of 1'''
prompt1 = "hi"
system_message = '''You are a bot that only replies to medical queries in the following JSON format {"reply":"", "doctors":[]}'''
response = '''{"reply":"Hi there, I can assist you with your medical queries.", "doctors":[]}'''
response1 = '''{"reply":"I can assist you with your kidney function tests. Your creatinine level is 1.30 mg/dL, and your estimated glomerular filtration rate (eGFR) is 90 ml/min. Based on the CKD-EPI formula, your score is 60.6, indicating mild kidney failure. Please consult a nephrologist for further evaluation.", "doctors":["Nephrologist"]}'''
prompt_template=f'''<|im_start|>system
{system_message}<|im_end|>
<|im_start|>user
{prompt1}<|im_end|>
<|im_start|>assistant
{response}<|im_end|>
<|im_start|>user
{prompt}<|im_end|>
<|im_start|>assistant
{response1}<|im_end|>
<|im_start|>user
Thank you<|im_end|>
<|im_start|>assistant
'''

print(pipe(prompt_template)[0]['generated_text'][len(prompt_template):])