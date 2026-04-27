<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="120" alt="Devopstrio Logo" />

<h1>BCDR Landing Zone</h1>

<p><strong>The Enterprise Flagship Foundation for Resilient Cloud Infrastructures, Disaster Recovery Spokes, and Cyber Recovery Vaults</strong></p>

[![Governance: Enforced](https://img.shields.io/badge/Governance-Enforced-blue.svg?style=for-the-badge&labelColor=000000)]()
[![Model: Hub--Spoke](https://img.shields.io/badge/Model-Hub--Spoke-indigo.svg?style=for-the-badge&labelColor=000000)]()
[![Security: FIPS--Ready](https://img.shields.io/badge/Security-FIPS--Ready-green.svg?style=for-the-badge&labelColor=000000)]()
[![Status: Production--Ready](https://img.shields.io/badge/Status-Production--Ready-0078d4?style=for-the-badge&labelColor=000000)]()

<br/>

> **"Resilience starts at the foundation."** 
> BCDR Landing Zone is a production-hardened platform engineered to provide secure, policy-driven cloud environments for global recovery platforms and mission-critical backup estates.

</div>

---

## 🏛️ Architecture Overview

The BCDR Landing Zone utilizes a multi-region Hub-and-Spoke topology with integrated regional isolation.

```mermaid
graph TD
    subgraph "Connectivity Hub"
        FW[Azure Firewall / WAF]
        DNS[Private DNS Resolver]
        GTM[Global Traffic Manager]
    end

    subgraph "Resilience Spoke - UK South"
        APP1[Tier-1 App Spoke]
        Vault1[Cyber Vault Spoke]
    end

    subgraph "Resilience Spoke - UK West"
        APP2[Tier-1 Warm Standby]
        Vault2[Replicated Vault]
    end

    FW <-->|Peering| APP1
    FW <-->|Peering| APP2
    GTM --> FW
    Vault1 -.->|Immutable Sync| Vault2
```

### 💉 Landing Zone Vending Lifecycle

```mermaid
sequenceDiagram
    participant Port as Governance Portal
    participant API as BCDR API
    participant TF as Terraform Engine
    participant Az as Azure Platform

    Port->>API: Deploy New "Gold" Spoke
    API->>TF: Trigger Blueprint (Warm-Standby)
    TF->>Az: Provision VNet + Subnets
    TF->>Az: Enforce NSG + Flow Logs
    TF->>Az: Peer to Hub + Inject Policies
    Az-->>Port: Ready (Endpoint: 10.4.x.x)
```

---

## 🚀 Business Outcomes

- **Zero-Trust Resilience**: 100% of BCDR Spokes are private-link enabled; no public ingress for recovery controllers.
- **Rapid Provisioning**: Reduce environment setup for new DR workloads from weeks to < 10 minutes.
- **Immutability Assurance**: Automatic configuration of "locked" storage accounts for cyber recovery workloads.
- **Global Visibility**: Consolidated heatmap of resilience posture across all global cloud instances.

---

## 📂 Repository Structure

```text
bcdr-landingzone/
├── apps/
│   ├── portal/             # Next.js 14 Management Dashboard
│   ├── api/                # FastAPI Core Resilience Gateway
│   ├── governance-engine/  # Policy Enforcement Workers
│   ├── network-engine/     # Hub-Spoke Orchestrator
│   └── cost-engine/        # DR Spend Optmization Engine
├── terraform/              # Enterprise Landing Zone IaC
│   ├── modules/            # Hardened Network, Vault, and Compute
│   └── environments/       # Global Region Topology (Prod/DR)
├── security/               # Cyber Recovery Controls & RBAC
├── monitoring/             # Prometheus & Alerting Rules
├── .github/workflows/      # Resilience CI/CD Pipelines
└── README.md               # Boardroom Product Documentation
```

---

## 🚀 Deployment Guide

### 1. Provision Global Hub (Terraform)
The base layer of connectivity and security inspection.

```bash
cd terraform/hub
terraform init
terraform apply -auto-approve
```

### 2. Vend a Resilience Spoke
Use the CLI or API to create a production-ready standby zone.

```bash
curl -X POST https://api.bcdr-lz.com/v1/spokes/deploy \
     -d '{"name": "payments-dr", "model": "pilot-light"}'
```

---

## 🛡️ Security Trust Boundary

```mermaid
graph LR
    User[Cloud Op] -->|PIM/MFA| Bastion[Jump Host]
    Bastion -->|Internal| BC[BCDR Landing Zone]
    BC -->|Immutable| SV[Secure Vault]
```

- **PIM/PAM**: All infrastructure changes require Just-In-Time role elevation.
- **Data Posture**: No public access points for any BCDR Spoke. All traffic routes via encrypted ExpressRoute/VPN backbones.
- **Governance**: Every resource is scanned for "Resilience-Tier" tags. Non-compliant resources are auto-quarantined.

---

## 🤝 Support & Roadmap
- **Deployment Support**: support@devopstrio.com
- **Enterprise Status**: [Status Page](https://status.devopstrio.com)

<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="50" alt="Devopstrio Logo" />

**Building the future of enterprise infrastructure — one blueprint at a time.**

</div>
