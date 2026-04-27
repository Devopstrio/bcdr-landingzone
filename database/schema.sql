-- BCDR Landing Zone Platform Schema
-- Target: PostgreSQL

CREATE TABLE IF NOT EXISTS tenants (
    tenant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spokes (
    spoke_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(tenant_id),
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    tier VARCHAR(50), -- GOLD, PLATINUM
    dr_model VARCHAR(100), -- PILOT_LIGHT, WARM_STANDBY, CYBER_VAULT
    subscription_id VARCHAR(100),
    last_compliance_audit TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS compliance_findings (
    finding_id BIGSERIAL PRIMARY KEY,
    spoke_id UUID REFERENCES spokes(spoke_id),
    rule_name VARCHAR(255),
    severity VARCHAR(50),
    status VARCHAR(50), -- OPEN, REMEDIATED, EXCEPTION
    observed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spend_logs (
    log_id BIGSERIAL PRIMARY KEY,
    spoke_id UUID REFERENCES spokes(spoke_id),
    amount_usd NUMERIC(15,2),
    billing_period VARCHAR(7), -- YYYY-MM
    spend_type VARCHAR(100) -- REPLICATION, COMPUTE, STORAGE
);

CREATE TABLE IF NOT EXISTS audit_logs (
    audit_id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    action VARCHAR(255),
    resource_id VARCHAR(255),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    details JSONB
);

CREATE INDEX idx_spoke_region ON spokes(region);
CREATE INDEX idx_finding_severity ON compliance_findings(severity);
