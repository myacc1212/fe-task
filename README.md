# This is a front end task for insonmia labs

To make this application work, you need to add your Alchemy API key `ALCHEMY_API_KEY=YOUR_APIKEY` to the .env file.

### Technical Details

For the front-end framework, I utilized Tailwind CSS along with Shadcdn UI components. To display BTC prices in different currencies, I implemented React-Table. For data fetching, I leveraged React-Query, ensuring efficient and performant data retrieval. Additionally, the codebase is fully type-safe. To secure the API key and avoid exposing it on the front-end, I created a Next.js route, enabling server-side retrieval of the key. For global data management, I utilized the built-in Context API.

### Features

Home Page: /

- The page displays price details of USD, GBP, and EUR currencies, automatically refreshing every 5 seconds.
- Users can choose different data refresh intervals using a feature toggle.
- The page supports toggling the display of specific currencies.
- User preferences for on-page features are remembered using local storage.

User NFTs Page: /nfts

- The page utilizes the Alchemy NFT API to fetch and display the user's NFTs.
- All the required data is presented, with the ability to open a modal on click.

*Additional Features*

- Users can filter NFTs based on the network, including Ethereum, Arbitrum, Optimism, and the default Sepolia network.
- Users can exclude SPAM and AIRDROP NFTs from the displayed list.
- Sorting by transfer time is available.

Please let me know if you have any further questions or if there's anything else I can provide.
