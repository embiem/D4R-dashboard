const SNAPSHOT_BLOCK = 13674896; // TODO

export default function Dashboard() {
  const address = "0xdac7afe53de8feab0af5b14f7599dc7dd184f931";
  const ens = "sha.eth";
  const tokens = [
    {
      clothing: "Sweat",
      id: "6590",
      industry: "White Hat",
      language: "Legit",
      lastTransferBlock: "13504896",
      lastTransferTime: "1635413015",
      location: "London",
      mind: "Critical",
      os: "Windows 95",
      texteditor: "VS Code",
      vibe: "Optimist",
    },
  ];

  const eligible = true;

  return (
    <div className="remix__page">
      <main>
        <h2>👋 {ens ? ens : address}</h2>
        <p>
          You own {tokens.length} D4R NFT{tokens.length !== 1 && "s"}.
        </p>
        {eligible ? (
          <p>
            🎉 You are eligible for the airdrop of Developer DAO's ERC20
            governance token 🎉
          </p>
        ) : (
          <p>
            You are <b>not</b> eligible for the airdrop of Developer DAO's ERC20
            governance token. The snapshot was at block {SNAPSHOT_BLOCK}.
          </p>
        )}
        {tokens.length === 0 && (
          <p>
            As memberships via the NFT have been closed, there's no need to get
            one right now.
          </p>
        )}
      </main>
      {tokens && tokens.length > 0 && (
        <aside>
          <h2>Your Token{tokens.length > 1 && "s"}</h2>
          <pre>{JSON.stringify(tokens, null, 2)}</pre>
        </aside>
      )}
    </div>
  );
}
