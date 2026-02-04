import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components'

interface PurchaseConfirmationProps {
    creatorName: string
    formationTitle: string
    studentName: string
    studentEmail: string
    amount: number
    currency: string
}

export default function PurchaseConfirmationEmail({
    creatorName,
    formationTitle,
    studentName,
    studentEmail,
    amount,
    currency,
}: PurchaseConfirmationProps) {
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency || 'EUR',
        }).format(value)
    }

    return (
        <Html>
            <Head />
            <Preview>💰 Nouvelle vente pour {formationTitle}!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>💰 Nouvelle vente!</Heading>

                    <Text style={text}>
                        Bonjour {creatorName},
                    </Text>

                    <Text style={text}>
                        Bonne nouvelle ! Vous avez une nouvelle vente pour votre formation <strong>{formationTitle}</strong>.
                    </Text>

                    <Section style={detailsBox}>
                        <Heading as="h2" style={h2}>Détails de la vente</Heading>
                        <Text style={detailText}>
                            <strong>Élève :</strong> {studentName}
                        </Text>
                        <Text style={detailText}>
                            <strong>Email :</strong> {studentEmail}
                        </Text>
                        <Text style={amountText}>
                            <strong>Montant :</strong> {formatPrice(amount)}
                        </Text>
                    </Section>

                    <Text style={text}>
                        Les fonds seront automatiquement transférés sur votre compte Stripe Connect
                        après la période de rétention standard.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Continuez à créer du contenu de qualité 🚀<br />
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

const detailsBox = {
    backgroundColor: '#ecfdf5',
    borderRadius: '8px',
    padding: '24px',
    margin: '32px 0',
    border: '1px solid #10b981',
}

const detailText = {
    color: '#333',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '4px 0',
}

const amountText = {
    color: '#10b981',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '16px',
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
