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

interface FormationPublishedProps {
    creatorName: string
    formationTitle: string
    formationUrl: string
}

export default function FormationPublishedEmail({
    creatorName,
    formationTitle,
    formationUrl,
}: FormationPublishedProps) {
    return (
        <Html>
            <Head />
            <Preview>🎉 Votre formation {formationTitle} est en ligne!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>🎉 Formation publiée!</Heading>

                    <Text style={text}>
                        Félicitations {creatorName}!
                    </Text>

                    <Text style={text}>
                        Votre formation <strong>{formationTitle}</strong> est maintenant en ligne
                        et prête à accueillir ses premiers élèves.
                    </Text>

                    <Section style={highlightBox}>
                        <Text style={highlightText}>
                            Partagez votre page de vente avec votre audience et commencez à générer des ventes !
                        </Text>
                    </Section>

                    <Section style={buttonContainer}>
                        <Button style={button} href={formationUrl}>
                            Voir ma page de vente →
                        </Button>
                    </Section>

                    <Section style={tipsBox}>
                        <Heading as="h2" style={h2}>🚀 Conseils pour bien démarrer</Heading>
                        <Text style={tipText}>1. Partagez sur vos réseaux sociaux</Text>
                        <Text style={tipText}>2. Envoyez un email à votre liste</Text>
                        <Text style={tipText}>3. Créez du contenu gratuit pour attirer des prospects</Text>
                        <Text style={tipText}>4. Collectez des témoignages de vos premiers élèves</Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Bonne chance avec votre lancement ! 🚀<br />
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
    margin: '20px 0 16px',
}

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
}

const highlightBox = {
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    padding: '24px',
    margin: '24px 0',
    border: '1px solid #f59e0b',
}

const highlightText = {
    color: '#92400e',
    fontSize: '16px',
    margin: '0',
    textAlign: 'center' as const,
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

const tipsBox = {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '24px',
    margin: '32px 0',
}

const tipText = {
    color: '#333',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '8px 0',
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
