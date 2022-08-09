import json

def main():
    OBJ_NAME = "PathData"
    OUTFILE = f"{OBJ_NAME}.ts"

    with open('data/Bedok, Singapore.json') as f:
        data = json.load(f)
    
    for idx, sample in data.items():
        obj = []
        for point in sample:
            lat, lng = point['lat'], point['lng']
            obj.append([lat, lng])
        
        obj_str = json.dumps(obj)

        long_string = """import { LatLngExpression } from "leaflet";\n\n"""      
        long_string = long_string + f"""export const {OBJ_NAME}: LatLngExpression[] = {obj_str};""" 

        with open(OUTFILE, 'w') as f:
            f.write(long_string)     

        return
        



if __name__ == '__main__':
    main()