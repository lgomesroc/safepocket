import React from 'react';
import { Container, Typography } from '@mui/material';

// Definindo a interface para as props (pode ser vazia se não houver props específicas)
interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = () => {
  return (
    <Container>
      <Typography variant="h4">Dashboard Page</Typography>
      {/* Adicione mais conteúdo do dashboard aqui */}
    </Container>
  );
};

export default DashboardPage;
