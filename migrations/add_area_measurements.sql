-- Add area measurement columns in square meters
-- These columns store plot size, built area, and living space measurements

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS plot_size_m2 NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS built_area_m2 NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS living_space_m2 NUMERIC(10, 2);

-- Add comments to document the purpose of each column
COMMENT ON COLUMN properties.plot_size_m2 IS 'Total plot/land area in square meters';
COMMENT ON COLUMN properties.built_area_m2 IS 'Total built-up area in square meters';
COMMENT ON COLUMN properties.living_space_m2 IS 'Usable living space in square meters';

