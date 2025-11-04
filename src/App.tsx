import { Component, onCleanup, onMount } from 'solid-js';
import { WalletProvider } from './contexts/WalletContext';

export const version = import.meta.env.PRIMAL_VERSION;
export const APP_ID = `web_${version}_${Math.floor(Math.random()*10000000000)}`;

const App: Component = () => {
  onMount(() => {
    connect();
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('./sw.js')
    //     .then(reg => console.log('SW registered: ', reg))
    //     .catch(err => console.log('SW registration failed: ', err));
    // }
  });

  onCleanup(() => {
    disconnect();
  });

  return (
    <WalletProvider>
      <AppProvider>
        <TranslatorProvider>
          <Toaster>
            <MediaProvider>
              <AccountProvider>
                <SearchProvider>
                  <AdvancedSearchProvider>
                    <SettingsProvider>
                      <ProfileProvider>
                        <DMProvider>
                          <NotificationsProvider>
                            <ReadsProvider>
                              <HomeProvider>
                                <ExploreProvider>
                                  <ThreadProvider>
                                    <AppRouter />
                                  </ThreadProvider>
                                </ExploreProvider>
                              </HomeProvider>
                            </ReadsProvider>
                          </NotificationsProvider>
                        </DMProvider>
                      </ProfileProvider>
                    </SettingsProvider>
                  </AdvancedSearchProvider>
                </SearchProvider>
              </AccountProvider>
            </MediaProvider>
          </Toaster>
        </TranslatorProvider>
        {import.meta.env.VITE_SHOW_WALLET_ENTRY === 'true' ? <WalletFAB /> : null}
      </AppProvider>
    </WalletProvider>
  );
};

export default App;
