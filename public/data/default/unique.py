import csv
import os
import shutil
from datetime import datetime

def add_unique_ids_to_csv(input_file, output_file):
    """
    Add sequential unique IDs as the first column of a CSV file.
    
    Args:
        input_file (str): Path to input CSV file
        output_file (str): Path to output CSV file
    """
    try:
        # Validate input file
        if not os.path.exists(input_file):
            raise FileNotFoundError(f"Input file '{input_file}' not found")
        
        if not input_file.endswith('.csv'):
            raise ValueError("Input file must be a CSV file")
            
        # Create backup of original file
        backup_file = f"{input_file}.{datetime.now().strftime('%Y%m%d_%H%M%S')}.backup"
        shutil.copy2(input_file, backup_file)
        
        # Process the CSV file
        with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            
            # Validate that file has content
            if not reader.fieldnames:
                raise ValueError("Input CSV file is empty or has no headers")
                
            fieldnames = ['unique_id'] + reader.fieldnames
            
            # Create output file
            with open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
                writer = csv.DictWriter(outfile, fieldnames=fieldnames)
                writer.writeheader()
                
                # Add unique IDs
                for id_counter, row in enumerate(reader, 1):
                    row['unique_id'] = id_counter
                    writer.writerow(row)
                    
        print(f"Success! Added unique IDs to {output_file}")
        print(f"Backup created at {backup_file}")
        
    except FileNotFoundError as e:
        print(f"Error: {e}")
    except PermissionError:
        print(f"Error: Permission denied accessing {input_file} or {output_file}")
    except csv.Error as e:
        print(f"CSV Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        # Clean up if output file is empty or error occurred
        if os.path.exists(output_file) and os.path.getsize(output_file) == 0:
            os.remove(output_file)

if __name__ == "__main__":
    input_file = 'privacy_laws.csv'
    output_file = 'privacy_laws_with_ids.csv'
    add_unique_ids_to_csv(input_file, output_file)
