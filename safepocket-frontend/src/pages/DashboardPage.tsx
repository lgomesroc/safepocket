// pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const DashboardPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Erro ao buscar transações', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async () => {
    try {
      await axios.post('/api/transactions', { description, amount });
      setDescription('');
      setAmount('');
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Erro ao adicionar transação', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">Saldo Atual: {/* Calcular e mostrar saldo */}</Typography>
      <TextField
        label="Descrição"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Valor"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTransaction}
      >
        Adicionar Transação
      </Button>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText primary={transaction.description} secondary={`R$ ${transaction.amount}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DashboardPage;
