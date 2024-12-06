import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Home () {
    return (
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <Container fluid className="py-5">
                <h1 className="display-5 fw-bold">Painel CIN</h1>
                <p className="col-md-8 fs-4">
                    Essa é uma simples aplicação de demonstração do meu curso{' '}
                    <span className="text-body-secondary fw-bold">Criando uma Infraestrutura na Nuvem</span>
                </p>
                <LinkContainer to="/users">
                    <Button variant="info">Ver usuários</Button>
                </LinkContainer>
            </Container>
        </div>
    );
}

export default Home;
