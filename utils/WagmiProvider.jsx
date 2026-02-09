'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider as WagmiProviderBase } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
    appName: 'Hashcase Carbon Credit',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
    chains: [polygon],
    ssr: false,
});

const queryClient = new QueryClient();

const WagmiProvider = ({ children }) => {
    return (
        <WagmiProviderBase config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProviderBase>
    );
};

export default WagmiProvider;
