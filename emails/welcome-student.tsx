import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components'

interface WelcomeEmailProps {
    studentName: string
    formationTitle: string
    formationUrl: string
    tempPassword: string
}

export default function WelcomeStudentEmail({
    studentName,
    formationTitle,
    formationUrl,
    tempPassword,
}: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Bienvenue dans {formationTitle} 🎉</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>🎉 Félicitations {studentName}!</Heading>

                    <Text style={text}>
                        Vous avez maintenant accès à <strong>{formationTitle}</strong>
                    </Text>

                    <Section style={credentialsBox}>
                        <Heading as="h2" style={h2}>Vos identifiants de connexion</Heading>
                        <Text style={text}>
                            <strong>Email :</strong> {studentName}
                        </Text>
                        <Text style={text}>
                            <strong>Mot de passe temporaire :</strong> {tempPassword}
                        </Text>
                        <Text style={warningText}>
                            ⚠️ Changez votre mot de passe après votre première connexion
                        </Text>
                    </Section>

                    <Section style={buttonContainer}>
                        <Button style={button} href={formationUrl}>
                            Accéder à ma formation →
                        </Button>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Si vous avez des questions, n&apos;hésitez pas à contacter le formateur.
                        <br />
                        Bonne formation !<br />
                        L&apos;équipe FormationPage
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
}

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
    textAlign: 'center' as const,
}

const h2 = {
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '20px 0',
}

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
}

const credentialsBox = {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '24px',
    margin: '32px 0',
}

const warningText = {
    color: '#f59e0b',
    fontSize: '14px',
    fontStyle: 'italic',
    marginTop: '16px',
}

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '32px 0',
}

const button = {
    backgroundColor: '#6366f1',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 32px',
}

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
}

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
}
