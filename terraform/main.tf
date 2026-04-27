terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# --- Resilience Connectivity Hub ---
resource "azurerm_resource_group" "hub" {
  name     = "rg-bcdr-hub-global-001"
  location = "UK South"
}

resource "azurerm_virtual_network" "hub_vnet" {
  name                = "vnet-bcdr-hub-uks"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.hub.location
  resource_group_name = azurerm_resource_group.hub.name
}

# --- Shared Resilience Services ---
resource "azurerm_firewall" "hub_fw" {
  name                = "fw-bcdr-global-aks"
  location            = azurerm_resource_group.hub.location
  resource_group_name = azurerm_resource_group.hub.name
  sku_name            = "AZFW_VNet"
  sku_tier            = "Premium"

  ip_configuration {
    name                 = "configuration"
    subnet_id            = azurerm_subnet.firewall_subnet.id
    public_ip_address_id = azurerm_public_ip.fw_pip.id
  }
}

# --- Resilience Policy Engine Storage ---
resource "azurerm_storage_account" "state" {
  name                     = "stbcdrlzstateprod"
  resource_group_name      = azurerm_resource_group.hub.name
  location                 = azurerm_resource_group.hub.location
  account_tier             = "Standard"
  account_replication_type = "GRS" # Geo-Redundant for Resilience Metadata
  
  blob_properties {
    versioning_enabled = true
    change_feed_enabled = true
  }
}
