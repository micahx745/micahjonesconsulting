# ARCHITECTURE.md — the napkin, as a file (from chapter 3)

Five boxes. Every arrow is a trust line; every trust line names what
stops the wrong person from using it.

    CLIENT (browser/phone)
      | session token
    SERVER (the only place rules are real)
      | owner filter        | signed access      | secrets
    DATA                  STORAGE             THIRD PARTIES
    (who sees what)       (files, private     (pay, mail, sms;
                           by default)         verified webhooks back
                                               into the SERVER)

Arrows and their locks:
- CLIENT to SERVER: session cookie; the server derives WHO from the
  session, never from client-sent IDs.
- SERVER to DATA: ownership enforced in the database (row-level
  security), so a forgetful query returns nothing, not everything.
- SERVER to STORAGE: private buckets; short-lived signed URLs only.
- SERVER to THIRD PARTIES: keys in host env vars; money truth comes
  only from signature-verified webhooks.

Public version rule: the public site says what the system DOES and
what protects it, never which brands it is assembled from.
