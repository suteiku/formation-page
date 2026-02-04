import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789')

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const data = await resend.emails.send({
      from: 'FormationPage <noreply@formationpage.com>',
      to: [to],
      subject,
      html,
    })
    console.log(`✅ Email envoyé à ${to}`)
    return data
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
    throw error
  }
}

// Template: Email de bienvenue pour l'élève
export function getWelcomeEmailHtml({
  name,
  formationTitle,
  email,
  tempPassword,
  loginUrl,
}: {
  name: string
  formationTitle: string
  email: string
  tempPassword: string
  loginUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #6366f1; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { 
      background: #6366f1; 
      color: white; 
      padding: 15px 30px; 
      text-decoration: none; 
      border-radius: 5px; 
      display: inline-block;
      margin: 20px 0;
    }
    .credentials { background: white; padding: 20px; border-radius: 5px; border: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Bienvenue dans votre formation !</h1>
    </div>
    <div class="content">
      <h2>Félicitations ${name} !</h2>
      <p>Vous avez maintenant accès à <strong>${formationTitle}</strong></p>
      
      <div class="credentials">
        <h3>Vos identifiants de connexion :</h3>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Mot de passe temporaire :</strong> ${tempPassword}</p>
        <p><em>⚠️ Changez votre mot de passe après votre première connexion</em></p>
      </div>
      
      <center>
        <a href="${loginUrl}" class="button">Accéder à ma formation →</a>
      </center>
      
      <p>Si vous avez des questions, n'hésitez pas à contacter le formateur.</p>
      
      <p>Bonne formation !<br>L'équipe FormationPage</p>
    </div>
  </div>
</body>
</html>
  `
}

// Template: Notification de vente pour le formateur
export function getSaleNotificationHtml({
  creatorName,
  formationTitle,
  studentName,
  studentEmail,
  amount,
  date,
  dashboardUrl,
}: {
  creatorName: string
  formationTitle: string
  studentName: string
  studentEmail: string
  amount: number
  date: string
  dashboardUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { 
      background: #6366f1; 
      color: white; 
      padding: 15px 30px; 
      text-decoration: none; 
      border-radius: 5px; 
      display: inline-block;
      margin: 20px 0;
    }
    .sale-info { background: white; padding: 20px; border-radius: 5px; border: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 Nouvelle vente !</h1>
    </div>
    <div class="content">
      <h2>Félicitations ${creatorName} !</h2>
      <p>Vous venez de réaliser une nouvelle vente :</p>
      
      <div class="sale-info">
        <p><strong>Formation :</strong> ${formationTitle}</p>
        <p><strong>Élève :</strong> ${studentName} (${studentEmail})</p>
        <p><strong>Montant :</strong> ${amount}€</p>
        <p><strong>Date :</strong> ${date}</p>
      </div>
      
      <p>L'argent sera transféré sur votre compte Stripe sous 2-7 jours.</p>
      
      <center>
        <a href="${dashboardUrl}" class="button">Voir mon tableau de bord →</a>
      </center>
    </div>
  </div>
</body>
</html>
  `
}
