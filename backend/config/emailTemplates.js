const generateEmailTemplate=(username,verificationToken)=>`
<div 
style ="height:600px;
        width:600px;
        border-radius:10px;
        background-color:#CDE1E9;
        padding:20px;
        align-items:center;">
<div
style="text-align:center;
       height:70px;
       width:300px;
       background-color:#4C829A;"><h1>LOG IN TO LISTIFY</h1></div>
<p>Welcome ${username}!
<br/>
Enter this code to verify your email</p>
<br/>
<h3>${verificationToken} </h3>
<br/>
<p>If you didn't create an account with us, please ignore this email</p>
<p>Best regards,
<br/>
Listify Team</p>

<div/>`;
export default generateEmailTemplate;