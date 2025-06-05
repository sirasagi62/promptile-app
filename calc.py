import sys
import re

def parse_number_with_k(s):
    """ '1.2k' → 1200, '0.0005' → 0.0005 """
    return float(s[:-1]) * 1000 if s.endswith('k') else float(s)

def parse_line(line):
    # Tokens: 4.1k sent, 458 received
    token_pattern = re.search(r'Tokens:\s*([\d.]+k?)\s*sent,\s*([\d.]+k?)\s*received', line)

    # Cost: $0.00059 message, $0.00059 session
    cost_pattern = re.search(r'Cost:\s*\$([\d.]+k?)\s*message,\s*\$([\d.]+k?)\s*session', line)

    sent = recv = msg_cost = sess_cost = 0.0

    if token_pattern:
        sent_str, recv_str = token_pattern.groups()
        sent = parse_number_with_k(sent_str)
        recv = parse_number_with_k(recv_str)

    if cost_pattern:
        msg_str, sess_str = cost_pattern.groups()
        msg_cost = parse_number_with_k(msg_str)
        sess_cost = parse_number_with_k(sess_str)
    print(sent,recv,msg_cost,sess_cost)
    return sent, recv, msg_cost, sess_cost

def main():
    total_sent = 0.0
    total_recv = 0.0
    total_msg_cost = 0.0
    total_sess_cost = 0.0

    for line in sys.stdin:
        sent, recv, msg_cost, sess_cost = parse_line(line)
        total_sent += sent
        total_recv += recv
        total_msg_cost += msg_cost
        total_sess_cost += sess_cost

    print(f"Total sent tokens:     {total_sent}")
    print(f"Total received tokens: {total_recv}")
    print(f"Total message cost:    ${total_msg_cost:.5f}")
    print(f"Total session cost:    ${total_sess_cost:.5f}")
    print(f"Total overall cost:    ${total_msg_cost + total_sess_cost:.5f}")

if __name__ == "__main__":
    main()

