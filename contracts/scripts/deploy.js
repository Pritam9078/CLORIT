const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 Deploying CLORIT V1 Contracts...\n");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);
    console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

    const contracts = {};

    try {
        // 1. Deploy AccessControlManager
        console.log("🛡️ Deploying AccessControlManager...");
        const AccessControlManager = await ethers.getContractFactory("AccessControlManager");
        const accessControlManager = await AccessControlManager.deploy();
        await accessControlManager.waitForDeployment();
        contracts.accessControlManager = await accessControlManager.getAddress();
        console.log("✅ AccessControlManager:", contracts.accessControlManager);

        // 2. Deploy CarbonEscrow
        console.log("\n🏦 Deploying CarbonEscrow...");
        const CarbonEscrow = await ethers.getContractFactory("CarbonEscrow");
        const carbonEscrow = await CarbonEscrow.deploy(contracts.accessControlManager);
        await carbonEscrow.waitForDeployment();
        contracts.carbonEscrow = await carbonEscrow.getAddress();
        console.log("✅ CarbonEscrow:", contracts.carbonEscrow);

        // 3. Deploy ProjectRegistry
        console.log("\n📋 Deploying ProjectRegistry...");
        const ProjectRegistry = await ethers.getContractFactory("ProjectRegistry");
        const projectRegistry = await ProjectRegistry.deploy(contracts.accessControlManager);
        await projectRegistry.waitForDeployment();
        contracts.projectRegistry = await projectRegistry.getAddress();
        console.log("✅ ProjectRegistry:", contracts.projectRegistry);

        // 4. Deploy CarbonCreditToken
        console.log("\n🪙 Deploying CarbonCreditToken...");
        const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");
        const carbonToken = await CarbonCreditToken.deploy(contracts.accessControlManager);
        await carbonToken.waitForDeployment();
        contracts.carbonToken = await carbonToken.getAddress();
        console.log("✅ CarbonCreditToken:", contracts.carbonToken);

        // 5. Deploy VerificationWorkflow
        console.log("\n✔️ Deploying VerificationWorkflow...");
        const VerificationWorkflow = await ethers.getContractFactory("VerificationWorkflow");
        const verificationWorkflow = await VerificationWorkflow.deploy(
            contracts.accessControlManager,
            contracts.projectRegistry,
            contracts.carbonToken
        );
        await verificationWorkflow.waitForDeployment();
        contracts.verificationWorkflow = await verificationWorkflow.getAddress();
        console.log("✅ VerificationWorkflow:", contracts.verificationWorkflow);

        // 6. Deploy CarbonMarketplace
        console.log("\n🏪 Deploying CarbonMarketplace...");
        const CarbonMarketplace = await ethers.getContractFactory("CarbonMarketplace");
        const marketplace = await CarbonMarketplace.deploy(
            contracts.accessControlManager,
            contracts.carbonToken,
            contracts.carbonEscrow
        );
        await marketplace.waitForDeployment();
        contracts.marketplace = await marketplace.getAddress();
        console.log("✅ CarbonMarketplace:", contracts.marketplace);

        // Setup roles
        console.log("\n⚙️ Setting up workflow connections...");
        
        // Link project registry to verification workflow
        const _projectRegistryContract = await ethers.getContractAt("ProjectRegistry", contracts.projectRegistry);
        await _projectRegistryContract.setVerificationWorkflow(contracts.verificationWorkflow);
        console.log("✅ Set VerificationWorkflow in ProjectRegistry");

        // Link token to verification workflow
        const _carbonTokenContract = await ethers.getContractAt("CarbonCreditToken", contracts.carbonToken);
        await _carbonTokenContract.setWorkflowManager(contracts.verificationWorkflow);
        console.log("✅ Set WorkflowManager in CarbonCreditToken");

        // Save deployment info
        const deploymentInfo = {
            network: "localhost",
            chainId: 31337,
            deployer: deployer.address,
            timestamp: new Date().toISOString(),
            contracts: contracts,
        };

        // Save to contracts directory
        fs.writeFileSync(
            path.join(__dirname, "../deployment-addresses.json"),
            JSON.stringify(deploymentInfo, null, 2)
        );

        // Save to src directory for frontend
        const srcContractsDir = path.join(__dirname, "../../src/contracts");
        fs.mkdirSync(srcContractsDir, { recursive: true });
        fs.writeFileSync(
            path.join(srcContractsDir, "addresses.json"),
            JSON.stringify(contracts, null, 2)
        );

        // Copy ABIs to frontend
        console.log("\n📦 Copying ABIs to frontend...");
        const artifactsDir = path.join(__dirname, "../artifacts/contracts");

        const abiFiles = [
            { name: "ProjectRegistry", path: "ProjectRegistry.sol/ProjectRegistry.json" },
            { name: "CarbonCreditToken", path: "CarbonCreditToken.sol/CarbonCreditToken.json" },
            { name: "VerificationWorkflow", path: "VerificationWorkflow.sol/VerificationWorkflow.json" },
            { name: "CarbonMarketplace", path: "CarbonMarketplace.sol/CarbonMarketplace.json" },
            { name: "AccessControlManager", path: "AccessControlManager.sol/AccessControlManager.json" },
            { name: "CarbonEscrow", path: "CarbonEscrow.sol/CarbonEscrow.json" }
        ];

        for (const file of abiFiles) {
            const artifactPath = path.join(artifactsDir, file.path);
            if (fs.existsSync(artifactPath)) {
                const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
                fs.writeFileSync(
                    path.join(srcContractsDir, `${file.name}.json`),
                    JSON.stringify({ abi: artifact.abi }, null, 2)
                );
                console.log(`  ✅ ${file.name}.json`);
            }
        }

        console.log("\n✨ Deployment Complete! ✨");
        console.log("\n📄 Contract Addresses:");
        console.log(JSON.stringify(contracts, null, 2));
        console.log("\n💾 Saved to:");
        console.log("  - contracts/deployment-addresses.json");
        console.log("  - src/contracts/addresses.json");
        console.log("  - src/contracts/*.json (ABIs)");

    } catch (error) {
        console.error("\n❌ Deployment failed:", error.message);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
