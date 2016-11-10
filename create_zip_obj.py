import urllib2, re, json
csv_file = urllib2.urlopen("https://gist.githubusercontent.com/erichurst/7882666/raw/5bdc46db47d9515269ab12ed6fb2850377fd869e/US%2520Zip%2520Codes%2520from%25202013%2520Government%2520Data").read()
# csv_file = csv_file[:500]
zip_list = re.split('\n', csv_file)
# print zip_list

obj = {}

for item in zip_list[1:]:
    try:
        zip_code, lon, lat = re.split(',', item)
        zip_code = zip_code.strip()
        lat = lat.strip()
        lon = lon.strip()
    except ValueError:
        continue
    obj[zip_code] = [float(lat), float(lon)]

file_obj = open('public/javascripts/zip_code_obj.js', 'w')
dump = json.dumps(obj)
# print dump
# print type(dump)
file_obj.write('zip_obj = ' + dump)
file_obj.close()
