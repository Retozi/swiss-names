import requests as req
from collections import defaultdict


def make_query(params):
    return req.get("http://cubecore.yoocos.com/api/default/query",
                   params=params)


def get_names_from_server(gender):
    query = "select [all][0][all][all] from px-x-Vornamen_{0} \
             reduce 2 transform vornamenRanking(0,10000) in de"

    params = {"query": query.format(gender),
              "_": 1415214452458}
    res = make_query(params)

    return [r['Vornamen'] for r in res.json()['result']
            if int(r['value']) > 100]


def list_to_str(l):
    return '["' + '","'.join(l) + '"]'


def make_new_name_structure():
    return {'de': {}, 'it': {}, 'fr': {}, 'ro': {}}

nested_default_dict = lambda: defaultdict(nested_default_dict)

REGIONS = {
    'Deutsches Sprachgebiet': 'de',
    'Französisches Sprachgebiet': 'fr',
    'Italienisches Sprachgebiet': 'it',
    'Rätoromanisches Sprachgebiet': 'ro'
}


def parse_item_data(data):
    res = defaultdict(lambda: defaultdict(list))
    for i in data['result']:
        name = i['Vornamen']
        reg = REGIONS.get(i['Sprachregion'])
        year = i['Geburtsjahr']
        if reg and year != 'Total':
            res[name][reg].append((year, i['value']))
    return res


def get_data_batch(names, gender):
    query = 'select {0}[all][all][all] from px-x-Vornamen_{1} in de'
    params = {"query": query.format(list_to_str(names), gender),
              "_": 1415214452465}
    data = make_query(params).json()
    return parse_item_data(data)


def optimize_item(langs):
    item = {}
    for l, data in langs.items():
        data.sort(key=lambda x: x[0])
        item[l] = [y[1] for y in data]
    return item


def optimize_schema(res):
    new_res = {'names': {},
               'years': [y[0] for y in res[list(res.keys())[0]]['de']]}
    for name, langs in res.items():
        new_res['names'][name] = optimize_item(langs)
    return new_res


def get_data(gender):
    names = get_names_from_server(gender)
    res = {}
    for i in range(0, len(names), 100):
        res.update(get_data_batch(names[i: i + 100], gender))
    return optimize_schema(res)
