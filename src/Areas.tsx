import React from 'react';
import Transacoes from './tabs/Transacoes';
import Catalogo from './tabs/Catalogo';
import Pedidos from './tabs/Pedidos';
import Produtos from './tabs/adm/Produtos';
import Funcionarios from './tabs/adm/Funcionarios';
import PaginaPrincipal from './tabs/PaginaPrincipal';

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
    case 7:
      return <Funcionarios />;
  }
});

export default Areas;
