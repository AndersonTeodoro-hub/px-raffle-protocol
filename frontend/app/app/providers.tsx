'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

type Web3ContextType = {
  address: string | null;
  isConnected: boolean;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const Web3Context = createContext<Web3ContextType>({
  address: null,
  isConnected: false,
  chainId: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

// Arbitrum Mainnet chainId
const ARBITRUM_CHAIN_ID = '0xa4b1'; // 42161 em decimal

export function Web3Provider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask não detectado! Por favor, instale a extensão MetaMask.');
      return;
    }

    try {
      // Solicita conexão
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      // Pega a rede atual
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setAddress(accounts[0]);
      setChainId(currentChainId);

      // Verifica se está no Arbitrum
      if (currentChainId !== ARBITRUM_CHAIN_ID) {
        const shouldSwitch = confirm(
          'Você não está conectado à rede Arbitrum. Deseja trocar?'
        );
        
        if (shouldSwitch) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: ARBITRUM_CHAIN_ID }],
            });
          } catch (switchError: any) {
            // Erro 4902 significa que a rede não está adicionada
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: ARBITRUM_CHAIN_ID,
                      chainName: 'Arbitrum One',
                      nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18,
                      },
                      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
                      blockExplorerUrls: ['https://arbiscan.io'],
                    },
                  ],
                });
              } catch (addError) {
                console.error('Erro ao adicionar rede Arbitrum:', addError);
              }
            }
          }
        }
      }
    } catch (error: any) {
      if (error.code === 4001) {
        alert('Conexão rejeitada pelo usuário');
      } else {
        console.error('Erro ao conectar carteira:', error);
        alert('Erro ao conectar. Tente novamente.');
      }
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setChainId(null);
  };

  useEffect(() => {
    // Verifica conexão existente
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            
            const currentChainId = await window.ethereum.request({
              method: 'eth_chainId',
            });
            setChainId(currentChainId);
          }
        } catch (error) {
          console.error('Erro ao verificar conexão:', error);
        }
      }
    };

    checkConnection();

    // Listeners para mudanças
    if (window.ethereum) {
      // Quando usuário troca de conta
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Usuário desconectou
          setAddress(null);
          setChainId(null);
        } else {
          setAddress(accounts[0]);
        }
      };

      // Quando usuário troca de rede
      const handleChainChanged = (newChainId: string) => {
        setChainId(newChainId);
        // Recarrega a página quando muda de rede (recomendação MetaMask)
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected: !!address,
        chainId,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}