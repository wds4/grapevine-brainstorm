import { nip19 } from 'nostr-tools'
import { safeRelayUrls } from './relays'

export function isHex(str) {
  if (str?.match(/^[0-9a-f]+$/i)) return true
  return false
}

export function safeDecode(str) {
  try {
    const result = nip19.decode(str)
    if (
      (result.type === 'nevent' || result.type === 'nprofile' || result.type === 'naddr') &&
      result.data.relays
    )
      result.data.relays = safeRelayUrls(result.data.relays)
    return result
  } catch (e) {}
}

export function safeNpubEncode(str) {
  try {
    const npub = nip19.npubEncode(str)
    if (npub) {
      return npub
    }
    return false
  } catch (e) {
    return false
  }
}

export function getPubkeyFromNpub(str) {
  try {
    const decoded = nip19.decode(str)
    if (decoded.type == 'npub') {
      return decoded.data
    } else {
      return ''
    }
  } catch (e) {}
}
