import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

DATA_FILE = os.path.join(settings.BASE_DIR, 'cards', 'data', 'cards.json')

def read_cards():
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

def write_cards(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=2)

def get_cards(request):
    cards = read_cards()
    return JsonResponse(cards, safe=False)

@csrf_exempt
def update_card(request, card_id):
    if request.method == 'PUT':
        import io
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        cards = read_cards()
        for card in cards:
            if card['id'] == card_id:
                card['description'] = body.get('description', card['description'])
                break
        else:
            return JsonResponse({'error': 'Card not found'}, status=404)

        write_cards(cards)
        return JsonResponse({'message': 'Card updated'})
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)

@csrf_exempt
def add_card(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        cards = read_cards()

        new_card = {
            'id': len(cards) + 1 if cards else 1,
            'title': body.get('title', 'New Card'),
            'description': body.get('description', 'No description available.')
        }

        cards = read_cards()
        cards.append(new_card)
        write_cards(cards)

        return JsonResponse({'message': 'Card added successfully', 'card': new_card}, status=201)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)

@csrf_exempt
def delete_card(request, card_id):
    if request.method == 'DELETE':
        cards = read_cards()
        card_to_delete = None
        for card in cards:
            if card['id'] == card_id:
                card_to_delete = card
                break

        if card_to_delete:
            cards.remove(card_to_delete)
            write_cards(cards)
            return JsonResponse({'message': 'Card deleted successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Card not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)
    