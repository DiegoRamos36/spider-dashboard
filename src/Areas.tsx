import React from 'react';
import Transacoes from './tabs/Transacoes';
import Catalogo from './tabs/Catalogo';
import Pedidos from './tabs/Pedidos';
import Estoque from './tabs/adm/Estoque';
import Produtos from './tabs/adm/Produtos';
import Funcionarios from './tabs/adm/Funcionarios';
import PaginaPrincipal from './tabs/PaginaPrincipal';
import VendasMensais from './tabs/relatorios/VendasMensais';
import MaisVendidos from './tabs/relatorios/MaisVendidos';

const Areas = React.memo(({ tab }: { tab: number }) => {
  switch (tab) {
    case 1:
      return <PaginaPrincipal />;
    case 2:
      return <Transacoes />;
    case 3:
      return <Catalogo />;
    case 4:
      return <Pedidos />;
    case 5:
      return <Produtos />;
    case 6:
      return <Estoque />;
    case 7:
      return <Funcionarios />;
    case 8:
      return <VendasMensais />;
    case 9:
      return <MaisVendidos />;
  }
});

export default Areas;
