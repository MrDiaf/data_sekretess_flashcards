// Card data, transcribed from answer.md.
// `q` and `a` are Markdown with $inline$ / $$display$$ math (String.raw keeps backslashes intact).
// `correct` / `wrong` are plain-text multiple choice options for the same question.
// Distractors are deliberately near-misses: same structure and length, one detail wrong.

const TOPICS = {
  models: 'Privacy models & disclosure',
  masking: 'Masking methods',
  dp: 'Differential privacy mechanisms',
  other: 'Other privacy mechanisms',
};

const CARDS = [
  // ---------------------------------------------------------------- models
  {
    id: '1', topic: 'models',
    q: String.raw`Discuss the transparency principle in data privacy in terms of risk and utility.`,
    a: String.raw`**Transparency principle:**
- A protection method should remain effective even when an attacker knows how it has been implemented.
- Privacy should not depend on keeping the protection method secret.

It has two implications: **disclosure risk** and **data utility**.

**Disclosure risk:**
- An attacker who knows how the method works can develop countermeasures against it.
- Countermeasure: the protection method should be evaluated under the assumption that the attacker knows how it works.
- This does not guarantee a reduction in risk, but ensures that the protection does not rely on secrecy.

**Data utility:**
- Improved utility because researchers know how the data has been modified.
- Example: if random noise is added to the data, knowing its distribution helps researchers estimate statistical properties and quantify uncertainty.`,
    correct: 'Protection must hold even if the attacker knows the method; risk is evaluated assuming attackers can build countermeasures, and utility improves because analysts know how the data was modified.',
    wrong: [
      'Protection must hold even if the attacker knows the method; this guarantees a lower disclosure risk, while utility decreases because the modification details must be published.',
      'Protection must hold even if the attacker knows the method; risk is evaluated assuming attackers can build countermeasures, but utility is unaffected since analysts never use the modification details.',
      'The method should be kept secret so attackers cannot build countermeasures; risk is evaluated against attackers without method knowledge, and utility improves since analysts receive cleaner data.',
    ],
  },
  {
    id: '2', topic: 'models',
    q: String.raw`Justify the importance of the transparency principle in terms of attacks and risk.`,
    a: String.raw`Without the transparency principle, we may **underestimate disclosure risk** because we haven't considered attackers who know how the protection method works and can develop countermeasures against it.`,
    correct: 'Without it we may underestimate disclosure risk, because we never consider attackers who know the protection method and develop countermeasures against it.',
    wrong: [
      'Without it we may overestimate disclosure risk, because we assume every attacker knows the protection method even when it is kept secret.',
      'Without it we may underestimate information loss, because analysts cannot correct for the modifications made to the data.',
      'Without it we may underestimate disclosure risk, because attackers who know the method can always invert it and recover the original data exactly.',
    ],
  },
  {
    id: '3', topic: 'models',
    q: String.raw`Why are anonymity sets relevant for privacy? Do they protect against identity and attribute disclosure?`,
    a: String.raw`**Anonymity sets:**
- A group of individuals whose records cannot be distinguished from one another based on the information available to an attacker.
- The records do not need to be completely identical, only indistinguishable with respect to the identifying information.

**Identity disclosure:**
- Anonymity sets protect against identity disclosure because an attacker cannot directly determine which record belongs to a specific individual.
- However, additional **external information** may still allow identification if it can be linked to another column in the published dataset, letting the attacker distinguish records and break the anonymity set.

**Attribute disclosure:**
- Anonymity sets do not necessarily protect against attribute disclosure.
- Example: your buddy lives in Town A and you know they took a published test. If all students in Town A received an F, you know your buddy got an F without knowing which record is theirs.
- Sensitive attributes can be disclosed even when individual records cannot be identified.`,
    correct: 'They group records the attacker cannot tell apart; they protect against identity disclosure (unless external info splits the set) but not necessarily against attribute disclosure.',
    wrong: [
      'They group records the attacker cannot tell apart; they protect against both identity and attribute disclosure, since no record can be tied to a specific person.',
      'They group records that must be identical in every column; they protect against identity disclosure but not necessarily against attribute disclosure.',
      'They group records the attacker cannot tell apart; they protect against attribute disclosure but not identity disclosure, since external info can always single out a record.',
    ],
  },
  {
    id: '4', topic: 'models',
    q: String.raw`Define identity disclosure for a database with information about people. Define attribute disclosure.`,
    a: String.raw`**Identity disclosure**
- Occurs when an attacker can identify which record in a database belongs to a particular individual.

**Attribute disclosure**
- An attacker gains **new** information about an individual.
- Does not require identifying the individual's record in the database.
- Can be as little as discovering that the individual is included in the database.
- If the attacker already knows all the attributes, identifying a record does not **necessarily** reveal new information about them. However, discovering an individual's membership in the database may still constitute disclosure.`,
    correct: 'Identity: the attacker finds which record belongs to an individual. Attribute: the attacker learns new information about an individual, possibly without finding their record — even learning membership counts.',
    wrong: [
      'Identity: the attacker finds which record belongs to an individual. Attribute: the attacker learns new information about an individual, but only after first linking them to their specific record in the file.',
      'Identity: the attacker learns that an individual is in the database. Attribute: the attacker finds which record belongs to the individual and reads its values.',
      'Identity: the attacker finds which record belongs to an individual. Attribute: the attacker learns a sensitive value about them — learning membership alone never counts as disclosure.',
    ],
  },
  {
    id: '5', topic: 'models',
    q: String.raw`Why does applying univariate microaggregation to a database with several variables not necessarily produce a file that satisfies k-anonymity?`,
    a: String.raw`- **Univariate (one-variable) microaggregation** groups and masks each **variable independently**.
- Each variable may have at least **k identical values**, but their **combinations (intersections)** may still be unique.
- Therefore, the anonymity sets formed by combinations of **quasi-identifiers** may contain fewer than **k records**, violating **k-anonymity**.`,
    correct: 'Each variable is grouped independently, so each has ≥ k equal values, but combinations of quasi-identifiers can still be unique, giving anonymity sets smaller than k.',
    wrong: [
      'Each variable is grouped independently, so some single variables end up with fewer than k equal values after grouping, giving anonymity sets smaller than k.',
      'All variables are grouped together, but the cluster mean differs per variable, so records in the same cluster are no longer identical.',
      'Each variable is grouped independently, so combinations can still be unique — but this only matters when the sensitive attributes are microaggregated too.',
    ],
  },
  {
    id: '6', topic: 'models',
    q: String.raw`How should variables be selected for microaggregation so that k-anonymity is satisfied?`,
    a: String.raw`**Univariate microaggregation**
- Each variable is microaggregated independently.
- An additional check is required to ensure that the combinations of **quasi-identifiers** still satisfy k-anonymity.
- If they do not, further modifications are required.

**Multivariate microaggregation**
- All quasi-identifiers are microaggregated together, using the same groups of at least **k records**.
- Because all quasi-identifiers are grouped together, their combinations cannot create smaller anonymity sets.
- Therefore, k-anonymity is **guaranteed** for the **selected** quasi-identifiers.`,
    correct: 'Microaggregate all quasi-identifiers together (multivariate) using the same groups of ≥ k records; univariate needs an extra check on the QI combinations.',
    wrong: [
      'Microaggregate each quasi-identifier separately (univariate) with groups of ≥ k records; k-anonymity then follows automatically for all combinations.',
      'Microaggregate all sensitive attributes together (multivariate) with groups of ≥ k records; the quasi-identifiers can stay unchanged.',
      'Microaggregate all quasi-identifiers together (multivariate) with groups of ≥ k records; this guarantees k-anonymity for every attribute, selected or not.',
    ],
  },
  {
    id: 'PM', topic: 'models',
    q: String.raw`What is a privacy model?`,
    a: String.raw`A **privacy model** defines the conditions that must be satisfied for data to be considered protected according to that model. Privacy conditions come in two types:

**Boolean**
- A condition is either satisfied or not (pass/fail).
- Example: k-anonymity.

**Quantitative**
- Disclosure risk is measured as a degree — how much risk exists?
- Example: re-identification risk.`,
    correct: 'A definition of the conditions data must meet to count as protected; conditions are Boolean (pass/fail, e.g. k-anonymity) or quantitative (a degree of risk, e.g. re-identification).',
    wrong: [
      'A definition of the conditions data must meet to count as protected; conditions are Boolean (pass/fail, e.g. re-identification) or quantitative (a degree of risk, e.g. k-anonymity).',
      'An algorithm that transforms data so it is protected; algorithms are perturbative (e.g. k-anonymity) or non-perturbative (e.g. re-identification).',
      'A definition of the conditions data must meet to count as protected; conditions are always quantitative, e.g. k-anonymity measures the risk as 1/k.',
    ],
  },
  {
    id: '7', topic: 'models',
    q: String.raw`Relate k-anonymity, as a privacy model, to its parameter k and anonymity sets.`,
    a: String.raw`- **k-anonymity** is a **Boolean privacy model**: a condition must be satisfied for the dataset to meet the privacy requirement.
- The parameter **k** defines the minimum number of records required in each anonymity set.
- **Anonymity sets** are formed from **combinations** of the selected **quasi-identifiers**.
- For k-anonymity to hold, the **smallest anonymity set** must contain at least **k records**.
- If any anonymity set contains fewer than **k records**, the dataset does not satisfy k-anonymity.`,
    correct: 'Boolean model: anonymity sets are formed by combinations of the selected QIs, and the smallest set must contain at least k records.',
    wrong: [
      'Boolean model: anonymity sets are formed by each QI separately, and every such set must contain at least k records.',
      'Quantitative model: anonymity sets are formed by combinations of the selected QIs, and the average set size must be at least k.',
      'Boolean model: anonymity sets are formed by combinations of the selected QIs, and the largest set must contain at least k records.',
    ],
  },
  {
    id: '8', topic: 'models',
    q: String.raw`Give an example of disclosure from a file that satisfies k-anonymity. Give an example of a privacy model that provides better protection against such disclosure.`,
    a: String.raw`**Disclosure despite k-anonymity**
- Example: everyone in Town A received an F on an exam.
- Even if **k is large**, knowing that your friend belongs to this anonymity set reveals that they received an F.
- This is **attribute disclosure**, despite satisfying k-anonymity.

**Solution: k-anonymity with l-diversity**
- **l-diversity** requires each anonymity set to contain at least **l distinct sensitive values** (distinct l-diversity).
- Example: Town A only has students with grade F, Town B only has grade E.
- Generalize town into **"A or B"**.
- With **l = 2**, the anonymity set now contains two different grades: E and F.
- An attacker who only knows their friend is in this set cannot determine the exact grade.
- This gives better protection against **attribute disclosure**, although it does not eliminate all disclosure risk.`,
    correct: 'Everyone in Town A got an F, so knowing a friend is in that set reveals their grade (attribute disclosure). l-diversity helps by requiring ≥ l distinct sensitive values per set.',
    wrong: [
      'Everyone in Town A got an F, so knowing a friend is in that set reveals their record (identity disclosure). l-diversity helps by requiring ≥ l distinct sensitive values per set.',
      'Everyone in Town A got an F, so knowing a friend is in that set reveals their grade (attribute disclosure). A larger k helps, since bigger sets always contain several grades.',
      'Everyone in Town A got an F, so knowing a friend is in that set reveals their grade (attribute disclosure). k-confusion helps by letting records in a set differ instead of being identical.',
    ],
  },
  {
    id: '9', topic: 'models',
    q: String.raw`What is the point of l-diversity if k-anonymity already protects against identity disclosure?`,
    a: String.raw`- **k-anonymity** protects against **identity disclosure** by making records indistinguishable within anonymity sets.
- However, it does not necessarily protect against **attribute disclosure**.
- **l-diversity** adds protection against **attribute disclosure** by requiring at least **l distinct sensitive values** within each anonymity set (distinct l-diversity).
- So even if an attacker knows which anonymity set an individual belongs to, they cannot necessarily determine the individual's sensitive attribute.`,
    correct: 'k-anonymity stops identity but not attribute disclosure; l-diversity requires ≥ l distinct sensitive values per set, so knowing someone\'s set does not reveal their sensitive value.',
    wrong: [
      'k-anonymity stops attribute but not identity disclosure; l-diversity requires ≥ l distinct sensitive values per set, so the individual\'s record can no longer be singled out.',
      'k-anonymity stops identity but not attribute disclosure; l-diversity requires ≥ l distinct quasi-identifier values per set, so knowing someone\'s set does not reveal their value.',
      'k-anonymity stops identity but not attribute disclosure; l-diversity requires ≥ l records per set, which on its own makes the sensitive values in each set different.',
    ],
  },
  {
    id: '10.1', topic: 'models',
    q: String.raw`Define **re-identification** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity disclosure.
- **Release:** database release.
- **Definition:** a privacy model that limits the risk of an attacker linking records in a released database to specific individuals. The attacker may use known attribute values to match individuals to records.
- **Type:** **quantitative** — re-identification risk is measured and must stay below a threshold.`,
    correct: 'Limits the risk of linking released records to individuals · identity disclosure · database release · quantitative (risk below a threshold).',
    wrong: [
      'Limits the risk of linking released records to individuals · identity disclosure · database release · Boolean (no record may be linked).',
      'Limits the risk of linking released records to individuals · attribute disclosure · database release · quantitative (risk below a threshold).',
      'Limits the risk of linking released records to individuals · identity disclosure · query release · quantitative (risk below a threshold).',
    ],
  },
  {
    id: '10.2', topic: 'models',
    q: String.raw`Define **uniqueness** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity disclosure.
- **Release:** database release (sample release).
- **Definition:** assesses how many records that are unique in the sample are also unique in the population, divided by the number of records unique in the sample.
- **Type:** **quantitative** — uniqueness risk is measured and must stay below a threshold.

$$\text{Uniqueness risk} = \frac{\text{unique in both sample and population}}{\text{unique in sample}}$$`,
    correct: '(unique in sample AND population) ÷ (unique in sample) · identity disclosure · database (sample) release · quantitative.',
    wrong: [
      '(unique in sample AND population) ÷ (unique in population) · identity disclosure · database (sample) release · quantitative.',
      '(unique in sample AND population) ÷ (unique in sample) · attribute disclosure · database (sample) release · quantitative.',
      '(unique in sample AND population) ÷ (unique in sample) · identity disclosure · database (sample) release · Boolean.',
    ],
  },
  {
    id: '10.3', topic: 'models',
    q: String.raw`Define **result-driven** privacy briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** database release.
- **Definition:** checks whether sensitive knowledge **K** can be derived by a data-mining algorithm **A** applied to database **X** with parameters **Θ**.
- **Type:** **Boolean** — either the sensitive knowledge can be derived or it cannot.

$$(A, X, \Theta) \nvdash K$$`,
    correct: 'Sensitive knowledge K must not be derivable by data-mining algorithm A on X with parameters Θ · attribute disclosure · database release · Boolean.',
    wrong: [
      'Sensitive knowledge K must not be derivable by data-mining algorithm A on X with parameters Θ · identity disclosure · database release · Boolean.',
      'Sensitive knowledge K must not be derivable by data-mining algorithm A on X with parameters Θ · attribute disclosure · query release · Boolean.',
      'Measures how much sensitive knowledge K algorithm A can derive from X with parameters Θ · attribute disclosure · database release · quantitative.',
    ],
  },
  {
    id: '10.4', topic: 'models',
    q: String.raw`Define **k-anonymity** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity disclosure.
- **Release:** database release.
- **Definition:** the smallest anonymity set formed by the **combinations of all selected quasi-identifiers** must contain at least **k records**.
- **Type:** **Boolean** — checks whether the smallest anonymity set contains at least k records.`,
    correct: 'Smallest anonymity set over combinations of all selected QIs has ≥ k records · identity disclosure · database release · Boolean.',
    wrong: [
      'Smallest anonymity set over combinations of all selected QIs has ≥ k records · identity and attribute disclosure · database release · Boolean.',
      'Every selected QI on its own has ≥ k records sharing each value · identity disclosure · database release · Boolean.',
      'Smallest anonymity set over combinations of all selected QIs has ≥ k records · identity disclosure · query release · Boolean.',
    ],
  },
  {
    id: '10.5', topic: 'models',
    q: String.raw`Define **k-confusion** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity disclosure.
- **Release:** database release.
- **Definition:** for every record in the database there must be at least **k possible matching records** in the protected data. They do **not** need to be identical or even similar — what counts depends on the attacker's knowledge and the protection method.
- **Type:** **Boolean** — checks that every record has at least k possible matches.`,
    correct: 'Each record has ≥ k plausible matches in the protected data, which need not be identical or similar · identity disclosure · database release · Boolean.',
    wrong: [
      'Each record has ≥ k matches in the protected data, which must share identical quasi-identifiers · identity disclosure · database release · Boolean.',
      'Each record has ≥ k plausible matches in the protected data, which need not be identical or similar · attribute disclosure · database release · Boolean.',
      'Each record has on average ≥ k plausible matches, which need not be identical or similar · identity disclosure · database release · quantitative.',
    ],
  },
  {
    id: '10.6', topic: 'models',
    q: String.raw`Define **p-sensitive k-anonymity** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity and attribute disclosure.
- **Release:** database release.
- **Definition:** an extension of k-anonymity requiring every anonymity set to contain at least **k records** and at least **p distinct values** for each sensitive attribute.
- **Type:** **Boolean** — checks whether both k-anonymity and p-sensitivity are satisfied.
- **Weakness:** having p distinct values does not mean they are equally likely; one sensitive value may still dominate the set.`,
    correct: 'Every set has ≥ k records and ≥ p distinct values per sensitive attribute · identity + attribute · database · Boolean · weakness: values need not be equally likely.',
    wrong: [
      'Every set has ≥ k records and ≥ p distinct values per quasi-identifier · identity + attribute · database · Boolean · weakness: values need not be equally likely.',
      'Every set has ≥ k records and ≥ p distinct values per sensitive attribute · identity only · database · Boolean · weakness: it ignores the quasi-identifiers.',
      'Every set has ≥ k records and a sensitive distribution within distance p of the whole file · identity + attribute · database · Boolean · weakness: values can still dominate.',
    ],
  },
  {
    id: '10.7', topic: 'models',
    q: String.raw`Define **k-anonymity with l-diversity** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity and attribute disclosure.
- **Release:** database release.
- **Definition:** an extension of k-anonymity requiring every anonymity set to contain at least **k records**, with at least **l well-represented sensitive values**.
- **Type:** **Boolean** — checks whether both k-anonymity and l-diversity are satisfied.
- **Difference:** unlike p-sensitivity, stronger forms of l-diversity consider how well the sensitive values are represented, not only how many distinct values exist.
- **Example:** entropy l-diversity considers the distribution of sensitive values; distinct l-diversity only counts them.`,
    correct: 'Every set has ≥ k records and ≥ l well-represented sensitive values; stronger forms (e.g. entropy) consider the distribution, unlike p-sensitivity · identity + attribute · database · Boolean.',
    wrong: [
      'Every set has ≥ k records and ≥ l distinct sensitive values; all forms only count values and ignore the distribution, just like p-sensitivity · identity + attribute · database · Boolean.',
      'Every set has ≥ k records and ≥ l well-represented sensitive values; stronger forms (e.g. entropy) consider the distribution, unlike p-sensitivity · attribute only · query · Boolean.',
      'Every set has ≥ k records and a sensitive distribution within distance l of the whole database, unlike p-sensitivity · identity + attribute · database · Boolean.',
    ],
  },
  {
    id: '10.8', topic: 'models',
    q: String.raw`Define **k-anonymity with t-closeness** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** identity and attribute disclosure.
- **Release:** database release.
- **Definition:** an extension of k-anonymity requiring every anonymity set to contain at least **k records**, where the distribution of each **sensitive attribute** in the set is sufficiently close to its distribution in the entire database.
- **Benchmark:** the distance between the distributions must not exceed a threshold **t**:

$$d(P_{\text{set}}, P_{\text{database}}) \leq t$$

- **d:** distance function, typically **Earth Mover's Distance (EMD)**.
- **t:** maximum allowed distance.
- **Type:** **Boolean** — checks whether both k-anonymity and t-closeness are satisfied.`,
    correct: 'Every set has ≥ k records and each sensitive attribute\'s distribution in the set is within distance t (usually EMD) of its distribution in the whole database · Boolean.',
    wrong: [
      'Every set has ≥ k records and each sensitive attribute\'s distribution in the set is at least distance t (usually EMD) from its distribution in the whole database · Boolean.',
      'Every set has ≥ k records and each sensitive attribute\'s distribution in the set is within distance t (usually EMD) of a uniform distribution · Boolean.',
      'Every set has ≥ k records and each sensitive attribute\'s distribution in the set is within distance t (usually EMD) of the whole database · quantitative.',
    ],
  },
  {
    id: '10.9', topic: 'models',
    q: String.raw`Define **interval disclosure** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** database release.
- **Definition:** a measure of disclosure risk that checks whether the **original sensitive value** lies within a specified interval around its **protected value**. If it does, the record is considered at risk of attribute disclosure.
- **Type:** **quantitative** — we compute the proportion of records whose original values fall within their intervals.`,
    correct: 'At risk if the original value lies inside an interval around the protected value · attribute disclosure · database release · quantitative (share of records at risk).',
    wrong: [
      'At risk if the original value lies outside an interval around the protected value · attribute disclosure · database release · quantitative (share of records at risk).',
      'At risk if the original value lies inside an interval around the protected value · identity disclosure · database release · quantitative (share of records at risk).',
      'At risk if the original value lies inside an interval around the protected value · attribute disclosure · database release · Boolean (fails if any record is at risk).',
    ],
  },
  {
    id: '10.10', topic: 'models',
    q: String.raw`Define **differential privacy** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** query release.
- **Definition:** limits how much the probability distribution of a query's output can change when one record is added to or removed from the database — commonly achieved by adding random noise to the result.

$$P(K(D_1)\in S)\leq e^\varepsilon P(K(D_2)\in S)$$

- **$D_1, D_2$:** two neighboring databases differing by one record.
- **$K$:** a randomized query mechanism.
- **$S$:** any set of possible outputs.
- **$\varepsilon$:** how much output probabilities may differ. **Smaller ε = stronger privacy.**

The inequality must hold for **every pair of neighboring databases and every output event**.

- **Type:** **Boolean** — does the mechanism satisfy the guarantee for a given ε?`,
    correct: 'Output probabilities of a randomized query change by at most a factor e^ε when one record is added/removed; smaller ε = stronger privacy · attribute · query release · Boolean.',
    wrong: [
      'Output probabilities of a randomized query change by at most a factor e^ε when one record is added/removed; larger ε = stronger privacy · attribute · query release · Boolean.',
      'Output probabilities of a randomized query change by at most a factor e^ε when one record is added/removed; smaller ε = stronger privacy · identity · database release · Boolean.',
      'Output probabilities change by at most a factor e^ε between two values one person could send from their own device; smaller ε = stronger privacy · attribute · query release · Boolean.',
    ],
  },
  {
    id: '10.11', topic: 'models',
    q: String.raw`Define **local differential privacy** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** query release.
- **Definition:** an extension of DP where each individual randomizes their sensitive data **locally, before sending it** to a central authority, so the authority never sees the original values.

  Instead of comparing two neighboring databases, we compare **two possible values from one individual**:

$$P(R(x_1)\in S)\leq e^\varepsilon P(R(x_2)\in S)$$

- **$x_1, x_2$:** two possible original values of one individual.
- **$R$:** the local randomization mechanism.
- **$S$:** any output event.
- **$\varepsilon$:** the privacy parameter bounding the probability ratio.

**Example:** a company wants to analyze customer spending. Alice spends 10,000 kr; her device sends a randomized value instead, so the company can't tell whether she spent 10,000 kr or e.g. 5,000 kr. Across many customers the company can still estimate the average.

- **Type:** **Boolean** — does the local mechanism satisfy the guarantee for a given ε?`,
    correct: 'Each person randomizes their own value before sending; compares outputs for two possible values x₁, x₂ of one person, bounded by e^ε · attribute · query release · Boolean.',
    wrong: [
      'The central collector randomizes values after receiving them; compares outputs for two possible values x₁, x₂ of one person, bounded by e^ε · attribute · query release · Boolean.',
      'Each person randomizes their own value before sending; compares outputs for two neighboring databases differing in one record, bounded by e^ε · attribute · query release · Boolean.',
      'Each person randomizes their own value before sending; compares outputs for two possible values x₁, x₂ of one person, bounded by e^ε · identity · database release · Boolean.',
    ],
  },
  {
    id: '10.12', topic: 'models',
    q: String.raw`Define **integral privacy** briefly. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** query release.
- **Type:** Boolean.

**Definition:** checks whether sufficiently many different databases could produce the exact same query result, without revealing that a particular person must be in the original database. It requires at least $k$ possible databases consistent with the attacker's background knowledge, and **no previously unknown individual may appear in all of them**.

**Example:** a school publicly lists applicants for a private study but not who actually participated. An attacker knows the applicants and their ages and checks which combinations of applicants could have produced the published results. If fewer than $k$ databases fit, or an applicant must be in every one of them, integral privacy is not satisfied.`,
    correct: '≥ k possible databases consistent with the attacker\'s knowledge must give the same result, and no previously unknown individual may appear in all of them · attribute · query · Boolean.',
    wrong: [
      '≥ k possible databases consistent with the attacker\'s knowledge must give the same result, and every individual must appear in at least one of them · attribute · query · Boolean.',
      '≥ k possible records consistent with the attacker\'s knowledge must give the same result, and no previously unknown individual may appear in all of them · attribute · query · Boolean.',
      '≥ k possible databases consistent with the attacker\'s knowledge must give the same result, and no previously unknown individual may appear in all of them · identity · database · Boolean.',
    ],
  },
  {
    id: '10.13', topic: 'models',
    q: String.raw`Define **homomorphic encryption**. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** query release.
- **Type:** Boolean.

**Definition:** allows computations directly on encrypted data without decrypting it first. An untrusted party can compute without access to the original data, intermediate values, or decrypted result.

**Example:** a university wants a cloud server to compute the average age of participants (30 and 70). It encrypts the ages; the cloud computes the encrypted sum:

$$D(E(30) \oplus E(70)) = 100$$

- $E$: encryption, $D$: decryption, $\oplus$: homomorphic addition.

The university decrypts and computes $100/2 = 50$. The cloud never learns the ages or their sum.

**Important:** it protects data during computation, but does not necessarily prevent disclosure through the final result if that is released.`,
    correct: 'Compute directly on encrypted data so an untrusted party sees no inputs, intermediates or result · attribute · query · Boolean · a released result can still disclose.',
    wrong: [
      'Compute directly on encrypted data so an untrusted party sees no inputs, intermediates or result · attribute · query · Boolean · a released result cannot disclose anything.',
      'Untrusted party decrypts data only in memory during the computation and re-encrypts the result · attribute · query · Boolean · a released result can still disclose.',
      'Compute directly on encrypted data so an untrusted party sees no inputs, intermediates or result · attribute · database · quantitative · a released result can still disclose.',
    ],
  },
  {
    id: '10.14', topic: 'models',
    q: String.raw`Define **secure multiparty computation (SMC)**. Does it focus on database or query release, and on attribute or identity disclosure?`,
    a: String.raw`- **Focus:** attribute disclosure.
- **Release:** query release.
- **Type:** Boolean — the protocol either satisfies the privacy guarantees under the assumed adversary model or it does not.

**Definition:** multiple parties jointly compute a function over their private databases without sharing the underlying data. Secure protocols achieve the guarantees of a trusted third party **without needing one**. Each party learns nothing beyond what follows from its own data and the agreed result.

**Example:** two universities compute the average age of their students together without sharing their databases.

**Important:** SMC does not prevent inference from the final result itself; it protects against learning extra information during the computation.`,
    correct: 'Parties jointly compute a function without sharing their data, getting trusted-third-party guarantees without one · attribute · query · Boolean · the result itself can still leak.',
    wrong: [
      'Parties send their data to a trusted third party that computes and returns only the result · attribute · query · Boolean · the result itself can still leak.',
      'Parties jointly compute a function without sharing their data, getting trusted-third-party guarantees without one · attribute · query · Boolean · nothing can be inferred from the result.',
      'Parties jointly compute a function without sharing their data, getting trusted-third-party guarantees without one · identity · database · quantitative · the result itself can still leak.',
    ],
  },
  {
    id: '11', topic: 'models',
    q: String.raw`In what sense are the privacy guarantees of k-confusion the same as those of k-anonymity?`,
    a: String.raw`Both k-anonymity and k-confusion give similar guarantees against **identity disclosure** by ensuring an anonymity set of at least **k plausible records** for each individual. The difference is that k-anonymity requires **identical quasi-identifiers**, while k-confusion allows different values as long as they remain **plausible matches**.`,
    correct: 'Both ensure an anonymity set of ≥ k plausible records per person against identity disclosure; k-anonymity needs identical QIs, k-confusion only plausible matches.',
    wrong: [
      'Both ensure an anonymity set of ≥ k plausible records per person against attribute disclosure; k-anonymity needs identical QIs, k-confusion only plausible matches.',
      'Both ensure an anonymity set of ≥ k plausible records per person against identity disclosure; k-confusion needs identical QIs, k-anonymity only plausible matches.',
      'Both require groups of ≥ k records with identical QIs against identity disclosure; k-confusion additionally requires the matches to confuse the attacker.',
    ],
  },
  {
    id: '12', topic: 'models',
    q: String.raw`Why does k-confusion provide similar protection to k-anonymity if records can be different? How does the definition of k-confusion link with the concept of anonymity sets?`,
    a: String.raw`k-confusion gives similar protection because both require an anonymity set containing at least $k$ plausible records.

Unlike k-anonymity, k-confusion does not require identical quasi-identifiers or even similar values — only that the records remain **plausible matches** for the original record.

Therefore, the anonymity set is defined by the **possible matches** rather than by identical quasi-identifiers.`,
    correct: 'Protection comes from having ≥ k plausible matches, not from identical values; the anonymity set is defined by the possible matches of the original record.',
    wrong: [
      'Protection comes from k-confusion still forcing records to lie within a small distance, so they look identical; the anonymity set is the records within that distance.',
      'Protection comes from having ≥ k plausible matches, not from identical values; the anonymity set is defined by the records sharing the original\'s exact QIs.',
      'Protection comes from k-confusion also requiring ≥ l distinct sensitive values per set; the anonymity set is defined by those sensitive values.',
    ],
  },
  {
    id: '13', topic: 'models',
    q: String.raw`Is the following statement always true, and how does it connect to k-confusion: *"Records need to be indistinguishable in order to build an anonymity set"*?`,
    a: String.raw`**False.** Records do not necessarily need to be indistinguishable to form an anonymity set.

In k-confusion, the records only need to be **plausible matches** for the original record, without requiring identical quasi-identifiers.

An attacker may use different re-identification methods and background knowledge; the anonymity set must still contain at least *k* plausible matches.

Therefore, k-confusion protects against identity disclosure through the **size of the anonymity set** rather than by requiring identical records.`,
    correct: 'Not always true: in k-confusion records only need to be ≥ k plausible matches, not indistinguishable, to form an anonymity set.',
    wrong: [
      'Always true: records must share identical quasi-identifiers, which is exactly why k-confusion is weaker than k-anonymity.',
      'Not always true: in k-confusion records need not be indistinguishable, but they must all lie within a small distance of the original.',
      'Always true: k-confusion is k-anonymity applied after masking, so the masked records still end up indistinguishable.',
    ],
  },
  {
    id: '14', topic: 'models',
    q: String.raw`Explain what a membership inference attack is.`,
    a: String.raw`A **membership inference attack** tries to determine whether a particular record was included in a model's **training dataset** by analyzing the model's behavior, often using **shadow models** to learn how predictions differ on training vs. non-training examples.

**Overfitting is often what makes these attacks possible**: a model that memorizes its training examples reveals more about which examples it has seen.`,
    correct: 'Determines whether a given record was in a model\'s training set by analysing its behaviour (often with shadow models); overfitting makes it easier.',
    wrong: [
      'Determines a missing attribute of a known training record from the model\'s predictions (often with shadow models); overfitting makes it easier.',
      'Determines whether a given record was in a model\'s training set by analysing its behaviour (often with shadow models); underfitting makes it easier.',
      'Reconstructs the full training records from the model\'s parameters by inverting it (often with shadow models); overfitting makes it easier.',
    ],
  },
  {
    id: '15', topic: 'models',
    q: String.raw`GANs are used to generate synthetic data. Does it make sense to apply membership inference attacks to GANs? Why?`,
    a: String.raw`**Yes.** Synthetic data does not automatically guarantee privacy. A GAN may **overfit or memorize** information from its training set, so generated samples or model behavior can reveal information about individual training records. An attacker can exploit this to infer whether a particular record was used in training.`,
    correct: 'Yes: synthetic data is not automatically private; a GAN can memorize training records, so its samples or behaviour can reveal membership.',
    wrong: [
      'No: GAN output is synthetic, so no generated record corresponds to a real person and training-set membership cannot be inferred from it.',
      'Yes, but only via the discriminator: the generator never sees real training records, so its synthetic samples can never reveal membership.',
      'No: membership inference only applies to classifiers that output confidence scores, and a GAN\'s generator does not classify.',
    ],
  },

  // ---------------------------------------------------------------- masking
  {
    id: '16', topic: 'masking',
    q: String.raw`True or false: *"Any masking method that includes some randomization is not vulnerable to transparency attacks."*`,
    a: String.raw`**False.** Adding randomization does not automatically make a masking method resistant to transparency attacks. If an attacker knows the masking algorithm and its parameters, they may combine that with external information to infer original values or re-identify individuals. How effective randomization is depends on how the method is designed and how much information it reveals.`,
    correct: 'False: an attacker who knows the algorithm and its parameters can combine them with external information to infer values or re-identify, randomness or not.',
    wrong: [
      'True: because the noise is random, knowing the algorithm and its parameters gives the attacker no information about the original values, even with external data.',
      'False: but only if the random seed leaks; knowing the algorithm and its parameters alone is harmless when randomization is used.',
      'True, as long as the noise parameters are kept secret, which is exactly what the transparency principle requires.',
    ],
  },
  {
    id: '17', topic: 'masking',
    q: String.raw`In microaggregation we require clusters to have at least k records, and the maximum size is usually 2k. What is the role of having a maximum size?`,
    a: String.raw`The maximum size limits unnecessary **information loss** and preserves **data utility**.

Very large clusters group dissimilar records together, causing more **distortion**.

A cluster with at least **2k records** can be split into smaller clusters that still satisfy the minimum size **k**, without increasing the squared-error loss (SSE).

So when minimizing SSE it is enough to allow at most **2k − 1 records** per cluster; larger clusters bring no advantage.`,
    correct: 'To limit information loss: a cluster of ≥ 2k records can be split into clusters of ≥ k without raising SSE, so sizes up to 2k − 1 are enough.',
    wrong: [
      'To limit disclosure risk: a cluster of ≥ 2k records makes records too alike to protect, so sizes up to 2k − 1 are needed for k-anonymity.',
      'To limit information loss: a cluster of ≥ 2k records can be split into clusters of ≥ k without raising SSE, so sizes up to 2k + 1 are enough.',
      'To limit information loss: optimal SSE needs clusters of exactly k records, and the 2k bound only exists to absorb the leftover records.',
    ],
  },
  {
    id: '18', topic: 'masking',
    q: String.raw`PRAM is applied to a categorical dataset with a transition matrix that has some zeros in non-diagonal positions. Can this matrix provide a meaningful differential privacy guarantee for the protected file?`,
    a: String.raw`**No** — applying the DP requirement to the transition matrix shows it can be violated.

Example transition probabilities:
- Cat → Cat: 0.8
- Cat → Dog: 0.2
- Dog → Cat: 0
- Dog → Dog: 1

DP requires:

$$P(M(D_1)=o)\leq e^\varepsilon P(M(D_2)=o)$$

If the output is Cat, compare origin Cat vs. Dog:

$$0.8\leq e^\varepsilon\cdot 0 = 0$$

This is impossible for any finite $\varepsilon$. A matrix with such zeros cannot give a meaningful finite pure DP guarantee.`,
    correct: 'No: if an output has probability 0 for one input but > 0 for another (e.g. 0.8 ≤ e^ε · 0), no finite ε satisfies the DP inequality.',
    wrong: [
      'Yes: off-diagonal zeros only mean some categories can never turn into certain others, which raises ε but keeps it finite.',
      'No, but only when the zeros are on the diagonal; off-diagonal zeros still allow a finite ε.',
      'Yes: as long as every row sums to 1 and every diagonal entry is below 1, all probability ratios stay bounded, so ε is finite.',
    ],
  },
  {
    id: '19', topic: 'masking',
    q: String.raw`What is PRAM and what is the connection between PRAM and differential privacy?`,
    a: String.raw`**PRAM (Post-Randomization Method)** is a masking method for **categorical** data. A transition matrix gives the probability that each original category is randomly replaced by another.

PRAM relates to **(local) differential privacy** because its transition probabilities determine whether the mechanism satisfies LDP. For every pair of original categories $A, B$ and every output $o$:

$$P(M(A)=o)\leq e^\varepsilon P(M(B)=o)$$

The same $\varepsilon$ must work for all combinations. The minimum $\varepsilon$ for the matrix is set by the **largest probability ratio** between inputs for the same output.

If any output has positive probability for one input and zero for another, the mechanism cannot satisfy finite pure LDP.`,
    correct: 'Masks categorical data by random replacement via a transition matrix; it is local DP when P(M(A)=o) ≤ e^ε P(M(B)=o) for all A, B, o — ε set by the largest ratio.',
    wrong: [
      'Masks categorical data by random replacement via a transition matrix; it is local DP when P(M(A)=o) ≤ e^ε P(M(B)=o) for all A, B, o — ε set by the smallest ratio.',
      'Masks numerical data by adding noise drawn from a transition matrix; it is local DP when P(M(A)=o) ≤ e^ε P(M(B)=o) for all A, B, o — ε set by the largest ratio.',
      'Masks categorical data by random replacement via a transition matrix; it is central DP since Laplace noise is added to each category\'s count — ε set by the largest ratio.',
    ],
  },
  {
    id: '20', topic: 'masking',
    q: String.raw`What condition does the PRAM transition matrix need to provide meaningful differential privacy?`,
    a: String.raw`The transition probabilities must satisfy

$$P(M(A)=o)\leq e^\varepsilon P(M(B)=o)$$

for **every pair of original categories and every output**.

If a probability is zero for one original category but positive for another, no finite $\varepsilon$ works.

So the matrix should have **all entries positive**, with probability ratios (between inputs, for the same output) bounded by a sufficiently small $e^\varepsilon$.`,
    correct: 'All entries positive, and for each output the ratio between any two inputs\' probabilities (same column) is bounded by a small e^ε.',
    wrong: [
      'All entries positive, and for each input the ratio between any two outputs\' probabilities (same row) is bounded by a small e^ε.',
      'Every diagonal entry must be at least e^ε times every off-diagonal entry in its row.',
      'Every row must sum to 1 and the matrix must be symmetric, so that A→B and B→A are equally likely.',
    ],
  },
  {
    id: '21', topic: 'masking',
    q: String.raw`Why is just synthetic data (e.g. from a GAN) not enough? Why do we need, for example, differentially private synthetic data?`,
    a: String.raw`Synthetic data alone does not guarantee privacy because a generator such as a GAN can **overfit and memorize** records from its training set.

Generated records may then reveal sensitive information about individuals — **disclosure risks** such as membership inference.

So we need **differentially private synthetic data**: DP is applied to the generation process, e.g. by adding calibrated noise during **training**.

This limits the influence of each training record and gives a **mathematical privacy guarantee**.`,
    correct: 'The generator can memorize training records (e.g. enabling membership inference); DP synthetic data adds calibrated noise during training, bounding each record\'s influence with a proof.',
    wrong: [
      'The generator can memorize training records (e.g. enabling membership inference); DP synthetic data adds Laplace noise to the generated records afterwards, bounding each record\'s influence.',
      'The generator can memorize training records (e.g. enabling membership inference); DP synthetic data drops any output identical to a training record, bounding each record\'s influence.',
      'Synthetic data has poor utility because it rarely matches real distributions; DP synthetic data adds calibrated noise during training, which restores that utility.',
    ],
  },
  {
    id: '22', topic: 'masking',
    q: String.raw`We apply a masking method (e.g. microaggregation) with different parameterizations, such as different cluster sizes. How do we select the best parameterization?`,
    a: String.raw`1. Decide which **disclosure risks** to minimize and choose matching privacy requirements.
2. Apply the method with each parameterization (e.g. different $k$).
3. For each, evaluate both **disclosure risk** and **information loss (data utility)**.
4. Pick the parameterization that meets the privacy requirements with the least information loss.

Alternatively, compare the **risk–utility trade-off**, e.g. on an **R-U map**.`,
    correct: 'Set privacy requirements, run each parameterization, measure both disclosure risk and information loss, and pick the one meeting requirements with least loss (or use an R-U map).',
    wrong: [
      'Set privacy requirements, run each parameterization, measure only disclosure risk, and pick the one with the lowest risk, since information loss is fully determined by k anyway.',
      'Set privacy requirements, run each parameterization, measure only information loss, and pick the largest k since a larger k always gives the lowest risk.',
      'Set privacy requirements, run each parameterization, measure both risk and loss, and pick the one with least loss even if it misses the requirements (R-U map).',
    ],
  },
  {
    id: '23', topic: 'masking',
    q: String.raw`How do heuristic methods for microaggregation work? Explain their relation with a privacy model.`,
    a: String.raw`Heuristic microaggregation uses a practical strategy — e.g. grouping nearby records — to form clusters of at least $k$ records. Each cluster gets a representative value, and records' values are replaced by it.

Relation to **k-anonymity**: when all quasi-identifiers are aggregated **together**, each released combination is shared by at least $k$ records, making individuals harder to distinguish using those attributes.`,
    correct: 'Practically group nearby records into clusters of ≥ k and replace values by the cluster representative; with all QIs aggregated together this yields k-anonymity.',
    wrong: [
      'Search all partitions for the clustering of ≥ k records with minimal SSE and replace values by the representative; with all QIs aggregated together this yields k-anonymity.',
      'Practically group nearby records into clusters of ≥ k and replace values by the cluster representative; even with each QI aggregated separately this yields k-anonymity.',
      'Practically group nearby records into clusters of ≥ k and replace values by the cluster representative; this yields l-diversity since each cluster has k sensitive values.',
    ],
  },

  // ---------------------------------------------------------------- dp
  {
    id: '24', topic: 'dp',
    q: String.raw`At our wedding we want to know whether your guests or my guests earn more. Every guest sends their salary with local DP noise from $L(0,\Delta s/\varepsilon)$. We add up the values for your guests and for mine and compare. Does this tell us whether the average salary of your guests is larger than mine?`,
    a: String.raw`We can **estimate** which group has the higher average by comparing the noisy means. Combining their standard deviations gives the uncertainty of their difference: the further the difference is from zero in standard-deviation units, the more confident we can be about which average is larger.

However, we **cannot guarantee** the correct result.`,
    correct: 'Only probabilistically: compare the noisy means and use their combined standard deviation to judge confidence; the result is not guaranteed.',
    wrong: [
      'Yes, exactly: Laplace noise has mean zero, so it cancels out when the values are summed and the comparison of the two groups is always correct.',
      'No: under local DP each value carries so much noise that the sums contain no usable information about which group has the larger average.',
      'Only probabilistically, and confidence grows as ε decreases, since a smaller ε means less noise per guest.',
    ],
  },
  {
    id: '25', topic: 'dp',
    q: String.raw`We are a group of thieves (at least three) and a painting has been stolen. Can an SMC protocol tell us whether one of us was involved, without anyone learning who?`,
    a: String.raw`**Yes**, using the **Dining Cryptographers protocol**:

1. Each participant flips a coin and secretly shares it with their neighbor.
2. Each participant XORs the two coin results they know.
3. If a participant was involved, they **invert** their announced result.
4. Everyone announces their result publicly; we compute the XOR of all announcements.

Each shared coin appears twice in the final XOR, so the coins cancel out. The result is **1 if an odd number** were involved, **0 if even**.

So, assuming **at most one** person was involved, we learn whether someone did it without learning who.

If several could be involved, XOR is insufficient — we would need a **secure OR**. Privacy also depends on everyone following the protocol and on collusion assumptions.`,
    correct: 'Yes, Dining Cryptographers: coins shared with neighbours, everyone announces an XOR, the thief inverts; coins cancel so the total XOR is 1 for an odd count — fine if at most one thief.',
    wrong: [
      'Yes, Dining Cryptographers: coins shared with neighbours, everyone announces an XOR, the thief inverts; coins cancel so the total XOR is 1 whenever at least one thief exists.',
      'Yes, Dining Cryptographers: everyone announces their own coin publicly and the thief inverts theirs; the total XOR is 1 for an odd count — fine if at most one thief.',
      'No: with three or more people, any protocol revealing whether someone was involved also narrows down who it was to one person.',
    ],
  },
  {
    id: '26', topic: 'dp',
    q: String.raw`A machine learning algorithm is applied to data set D to obtain model M. Explain why M can lead to disclosure, and give an example.`,
    a: String.raw`A model can lead to disclosure because it may **overfit and memorize** information from its training data.

**Example:** a generative model trained on records with age, gender, profession and income could generate a record very close to a real individual's. If an attacker links that record to a known person using external information, they may infer that person's income.

Disclosure can also happen through **membership inference attacks**, where the attacker determines whether a specific record was used in training.`,
    correct: 'M can memorize: e.g. a generative model outputs a near-copy of a real person\'s record which, linked with outside info, reveals their income; membership inference also works.',
    wrong: [
      'M only stores aggregate parameters, so disclosure needs the training data itself to leak; e.g. a stolen copy of D reveals incomes, while membership inference does not apply.',
      'M can memorize training data: e.g. a generative model outputs a near-copy of a real person\'s record — but this only applies to generative models, never to classifiers.',
      'M can underfit and output averages: e.g. a model that predicts a group\'s average income reveals each individual\'s exact income; membership inference also works.',
    ],
  },
  {
    id: '27', topic: 'dp',
    q: String.raw`In differential privacy, why do multiple queries on the same dataset increase disclosure? Is this quantifiable in terms of ε?`,
    a: String.raw`Answers can be **combined**: e.g. averaging repeated answers with fresh independent noise reduces the noise and reveals a more accurate estimate of the true value.

This is quantified by **sequential composition**: queries with $\varepsilon_1,\ldots,\varepsilon_k$ together satisfy $(\sum_i\varepsilon_i)$-DP. A larger total ε means **weaker** privacy. We control it with a total **privacy budget** that the sum of query costs must stay within.`,
    correct: 'Answers combine (averaging repeated noisy answers cancels noise); sequential composition gives total ε = Σεᵢ, a larger total meaning weaker privacy — managed with a budget.',
    wrong: [
      'Answers combine (averaging repeated noisy answers cancels noise); sequential composition gives total ε = max εᵢ, so only the costliest query counts against the budget.',
      'Answers combine (averaging repeated noisy answers cancels noise); sequential composition gives total ε = Σεᵢ, a larger total meaning stronger privacy — managed with a budget.',
      'Answers combine (averaging repeated noisy answers cancels noise); this cannot be expressed in ε since each query\'s noise is drawn independently.',
    ],
  },
  {
    id: '28', topic: 'dp',
    q: String.raw`Apply DP to these functions on values in $[0,1]$: (a) minimum, (b) maximum, (c) median, each of an arbitrary number of arguments. Compute their sensitivity and the Laplace scale $b$ for $\varepsilon = 1$ and $\varepsilon = 2$. Which is more accurate? Compare with the mean.`,
    a: String.raw`Assuming neighboring datasets differ by replacing one value, sensitivity is the largest possible change in the output. With inputs in $[0,1]$, min, max and median all have worst-case sensitivity **1** across arbitrary input counts.

$$b = \frac{\Delta s}{\varepsilon}$$

| Function | Sensitivity | b for ε = 1 | b for ε = 2 |
|---|---:|---:|---:|
| Minimum | 1 | 1 | 1/2 |
| Maximum | 1 | 1 | 1/2 |
| Median (worst case) | 1 | 1 | 1/2 |
| Mean of n inputs | 1/n | 1/n | 1/(2n) |

- **ε = 2** gives more accurate outputs (smaller noise) but **weaker privacy**.
- **Mean:** replacing one input changes the sum by at most 1, divided by n → sensitivity **1/n**, so it needs less noise as n grows.
- **Median detail:** for a fixed odd n the sensitivity is 1; for a fixed even n it is 1/2. Worst case across arbitrary n is 1.`,
    correct: 'Min, max, median: Δ = 1, so b = 1 (ε=1) and 1/2 (ε=2); mean: Δ = 1/n, needing far less noise; ε = 2 is more accurate but less private.',
    wrong: [
      'Min, max: Δ = 1; median: Δ = 1/2; so b = 1 or 1/2 (ε=1) and 1/2 or 1/4 (ε=2); mean: Δ = 1/n; ε = 2 is more accurate but less private.',
      'Min, max, median: Δ = 1, so b = 1 (ε=1) and 2 (ε=2); mean: Δ = 1/n, needing far less noise; ε = 2 is less accurate but more private.',
      'Min, max, median: Δ = 1/n, so b = 1/n (ε=1) and 1/(2n) (ε=2); mean: Δ = 1, needing more noise; ε = 2 is more accurate but less private.',
    ],
  },
  {
    id: '29', topic: 'dp',
    q: String.raw`We compute $f$ = the mean of a variable from database $X$, with sensitivity $(\max - \min)/S$ where $S$ is the minimum number of records. If we first microaggregate $X$ with at least $k$ records per cluster, what happens to the sensitivity of $f$ — larger or smaller?`,
    a: String.raw`Microaggregation builds clusters and replaces records by a representative, typically the cluster mean. The sensitivity of the mean is

$$\Delta(\text{mean}) = \frac{\max-\min}{S}$$

Microaggregation may shrink the **observed** min and max, but that does not reduce the sensitivity used in DP. If each record is replaced by its cluster mean, the overall mean is **preserved**:

$$f(A(X)) = f(X)$$

so for neighboring $X, X'$:

$$|f(A(X)) - f(A(X'))| = |f(X) - f(X')|$$

Therefore the sensitivity of the mean is **unchanged**.`,
    correct: 'Unchanged: replacing records by cluster means preserves the overall mean, f(A(X)) = f(X), so neighbouring datasets differ just as much.',
    wrong: [
      'Smaller: microaggregation shrinks the observed min and max of the released data, so (max − min)/S decreases and less noise is needed.',
      'Smaller by a factor k: each representative averages k records, so the effect of changing one record on the mean is divided by k.',
      'Larger: changing one record shifts its whole cluster mean, so k released values change at once instead of only one.',
    ],
  },
  {
    id: '30', topic: 'dp',
    q: String.raw`For ε-differential privacy with the Laplace mechanism, describe the general effect of a query's sensitivity on the amount of noise, assuming a fixed ε.`,
    a: String.raw`For fixed $\varepsilon$, the Laplace noise grows **linearly** with sensitivity:

$$b = \frac{\Delta f}{\varepsilon}$$

Higher sensitivity → more noise; lower sensitivity → less noise.`,
    correct: 'Noise grows linearly with sensitivity, b = Δf/ε, so doubling the sensitivity doubles the noise scale.',
    wrong: [
      'Noise grows quadratically with sensitivity, b = Δf²/ε, so doubling the sensitivity quadruples the noise scale.',
      'Noise shrinks as sensitivity grows, b = ε/Δf, so doubling the sensitivity halves the noise scale.',
      'Noise does not depend on sensitivity for fixed ε, b = 1/ε; sensitivity only changes the privacy guarantee.',
    ],
  },
  {
    id: '31', topic: 'dp',
    q: String.raw`One function gives a DP mean, another a DP standard deviation. If we apply both to the same data set, each with budget ε, what can we say about the disclosure?`,
    a: String.raw`Privacy losses **add up** by **sequential composition**:

$$\varepsilon_{\text{total}} = \varepsilon + \varepsilon = 2\varepsilon$$

The combined release is **2ε-DP**, allowing more potential disclosure than either release alone.`,
    correct: 'Sequential composition: the combined release is 2ε-DP, so it can disclose more than either release on its own.',
    wrong: [
      'Parallel composition: the combined release is still ε-DP, since both functions use the same budget.',
      'Sequential composition: the combined release is 2ε-DP, so it discloses less, since twice as much noise was added.',
      'Sequential composition: the combined release is ε²-DP, so it can disclose more than either release on its own.',
    ],
  },
  {
    id: '32', topic: 'dp',
    q: String.raw`A data scientist queries the max and min of a data set, uses them to compute the sensitivity, then applies local DP with that sensitivity and the desired ε. What is wrong from a privacy perspective?`,
    a: String.raw`Sensitivity is computed from the **actual** max and min of the private data instead of **predefined public bounds**.

The extremes are themselves sensitive, and using them to set the noise scale can leak information about the data, so the method doesn't necessarily give a valid DP guarantee.

Also, **local DP** is meant to be applied **before** data reaches an untrusted collector. If the scientist already holds the raw data, local DP cannot protect it from them.

So: compute sensitivity from public/predefined bounds, and choose local vs. central DP based on who is trusted with raw data.`,
    correct: 'Sensitivity comes from the real private min/max instead of public bounds, which leaks and voids the DP guarantee; and local DP is pointless if the scientist already holds raw data.',
    wrong: [
      'Sensitivity comes from the real private min/max instead of public bounds — this only adds too much noise, the DP guarantee still holds; local DP is the right choice here.',
      'Sensitivity should come from the mean rather than min/max; otherwise it is fine, since local DP protects the raw data from the scientist.',
      'Using the real min/max is fine since they are only two numbers; the only issue is that central DP would need less noise than local DP.',
    ],
  },
  {
    id: '33', topic: 'dp',
    q: String.raw`Data in $[0,1000]$, database with at least 100 records, fixed ε. Which of **mean** and **maximum** requires more noise, and why? Relate it to sensitivity.`,
    a: String.raw`$$\Delta f_{\text{mean}} = \frac{1000-0}{100} = 10 \qquad \Delta f_{\max} = 1000-0 = 1000$$

The mean is less sensitive because one record affects it in proportion to the number of records. The max is highly sensitive because one record can move it across the whole range.

Since Laplace noise is linear in sensitivity for fixed $\varepsilon$:

$$b = \frac{\Delta f}{\varepsilon}$$

the **maximum needs a 100× larger noise scale** than the mean.`,
    correct: 'Maximum: Δmax = 1000 while Δmean = 1000/100 = 10, and since b = Δf/ε the max needs a 100× larger noise scale.',
    wrong: [
      'Maximum: Δmax = 1000 while Δmean = 1000/100 = 10, and since b = Δf/ε the max needs a 10× larger noise scale.',
      'Mean: Δmean = 1000 while Δmax = 1000/100 = 10, and since b = Δf/ε the mean needs a 100× larger noise scale.',
      'Neither: both have Δ = 1000 since one record can span the whole range, so with b = Δf/ε they need equal noise.',
    ],
  },

  // ---------------------------------------------------------------- other
  {
    id: '34', topic: 'other',
    q: String.raw`SMC and DP can be seen as two different privacy models. Why should we consider them together in a single framework? Give an example.`,
    a: String.raw`They protect **different aspects**:

- **SMC** lets parties compute a function without revealing their private inputs to each other — but the **final result** can still disclose sensitive information.
- **DP** limits how much can be inferred about an individual from the **released result**.

**Example:** several hotels want to know how many wealthy people visited a town. SMC lets them compute the total without sharing guest records. But if the result is exactly one, someone with extra knowledge might infer who it was. Adding DP noise to the final count reduces this risk.

Together they protect both the **computation** and the **released result**.`,
    correct: 'SMC hides inputs during the computation but the result can still leak; DP limits what the result reveals — e.g. hotels count wealthy visitors with SMC and add DP noise to the total.',
    wrong: [
      'DP hides inputs during the computation but the result can still leak; SMC limits what the result reveals — e.g. hotels count wealthy visitors with DP and add SMC to the total.',
      'SMC hides inputs during the computation but the result can still leak; DP is used to encrypt the messages between parties — e.g. hotels exchange DP-encrypted guest lists.',
      'SMC hides inputs during the computation but the result can still leak; DP noise on each record lets hotels skip SMC entirely — e.g. hotels share noisy guest lists openly.',
    ],
  },
  {
    id: '35', topic: 'other',
    q: String.raw`Why can the dining cryptographers problem (equivalently, computing XOR with SMC) be seen as related to **unobservability**?`,
    a: String.raw`It provides **anonymity** and aspects of **undetectability**:

- **Anonymity:** participants learn whether someone paid without learning who.
- **Undetectability:** everyone sends a bit whether or not they paid, so observing one participant's communication doesn't reveal whether they paid.

However, the final XOR reveals whether an odd number paid, so the **collective** event is not fully undetectable.

**TL;DR — it depends on what we are hiding:**
- *Did someone at the table pay?* Not undetectable — the XOR reveals it (assuming at most one payer).
- *Did a specific individual pay?* Hidden — this is primarily anonymity.

So it gives anonymity of the payer but not complete undetectability of the collective payment.`,
    correct: 'It hides who paid (anonymity) and everyone sends a bit regardless (individual undetectability), but the XOR reveals that someone paid, so the collective event is not undetectable.',
    wrong: [
      'It gives full unobservability: everyone sends a bit regardless, so neither who paid nor whether anyone paid can be learned from the outcome.',
      'It hides whether anyone paid (collective undetectability), but not who paid, since the payer\'s inverted bit stands out among the other announcements at the table.',
      'It relates to unlinkability rather than unobservability: it hides which announcement came from whom, while each person\'s actual payment remains observable to the others.',
    ],
  },
  {
    id: '36', topic: 'other',
    q: String.raw`What is a semi-honest adversary?`,
    a: String.raw`A **semi-honest** adversary **follows the protocol correctly** but tries to infer as much private information as possible from what is available during execution — its own inputs, received messages and outputs — without deviating from the protocol.`,
    correct: 'One that follows the protocol correctly but tries to infer as much as possible from its inputs, received messages and outputs.',
    wrong: [
      'One that follows the protocol correctly and never tries to infer anything beyond the final output it is supposed to receive.',
      'One that deviates from the protocol only when it is sure it won\'t be detected, and otherwise behaves honestly and infers nothing.',
      'One that may submit false inputs but otherwise follows the protocol, inferring what it can from the messages it receives.',
    ],
  },
  {
    id: '37', topic: 'other',
    q: String.raw`What is a malicious adversary, and why can malicious adversaries get some information from an SMC protocol even if all information is encrypted?`,
    a: String.raw`A **malicious** adversary is a participant who **deliberately deviates** from the protocol to gain confidential information — e.g. by providing false inputs, manipulating intermediate computations, or colluding with others.

Encryption alone doesn't guarantee privacy: the adversary can **manipulate the protocol** or **combine information they legitimately receive** to infer private data.

So SMC protocols must be designed to withstand malicious behavior, not just unauthorized access to encrypted data.`,
    correct: 'A participant who deliberately deviates (false inputs, tampering, collusion); encryption doesn\'t stop it, as it can manipulate the protocol or combine what it legitimately receives.',
    wrong: [
      'A participant who follows the protocol but attacks the ciphertexts directly; it only learns something if the keys are weak, so strong encryption fully stops it.',
      'A participant who deliberately deviates (false inputs, tampered steps, collusion); it only learns something by breaking the encryption, so strong encryption fully stops it.',
      'An outside eavesdropper on the network, not a participant; encryption doesn\'t stop it, since it can manipulate the protocol or combine what it intercepts.',
    ],
  },
  {
    id: '38', topic: 'other',
    q: String.raw`What is the difference between a semi-honest adversary and a malicious adversary in secure multiparty computation?`,
    a: String.raw`- **Semi-honest:** follows the protocol correctly but tries to infer as much as possible from the information available during execution.
- **Malicious:** may deliberately deviate — false inputs, manipulated messages, unauthorized actions — to gain confidential information.

The key difference: semi-honest adversaries **follow** the protocol; malicious ones may **break its rules**.`,
    correct: 'Semi-honest follows the protocol and infers from what it sees; malicious may break the rules, e.g. with false inputs or manipulated messages.',
    wrong: [
      'Malicious follows the protocol and infers from what it sees; semi-honest may break the rules, e.g. with false inputs or manipulated messages.',
      'Both follow the protocol and infer from what they see; malicious additionally colludes with other parties, while semi-honest works alone.',
      'Semi-honest follows the protocol but may submit false inputs; malicious additionally manipulates the messages exchanged between parties.',
    ],
  },
  {
    id: '39', topic: 'other',
    q: String.raw`In tabular data protection, why do we need secondary suppressions? Why is suppressing the sensitive values not enough?`,
    a: String.raw`Hiding only the sensitive cell (primary suppression) may not prevent disclosure.

If the table has **public totals** and other visible values, an attacker can **recompute the suppressed value by subtraction**.

**Secondary suppression** hides additional cells so the sensitive values cannot be reconstructed.`,
    correct: 'Because with visible totals and other cells, a suppressed sensitive cell can be recomputed by subtraction; extra cells are hidden to block that.',
    wrong: [
      'Because with visible totals and other cells, a suppressed sensitive cell can be recomputed by subtraction; the totals are therefore hidden instead.',
      'Because primary suppression removes too much utility, so secondary suppression restores some cells by replacing them with rounded values.',
      'Because a sensitive cell can be inferred from its row and column labels, so its entire row must be removed from the table.',
    ],
  },
  {
    id: '40', topic: 'other',
    q: String.raw`Perturbative methods appear repeatedly in data protection for different types of data. List some of them.`,
    a: String.raw`Examples of **perturbative** methods (they modify/distort the data):

- PRAM (Post-Randomization Method)
- Noise addition
- Rank swapping
- Microaggregation
- Lossy compression`,
    correct: 'PRAM, noise addition, rank swapping, microaggregation, lossy compression.',
    wrong: [
      'PRAM, noise addition, rank swapping, generalization, top coding.',
      'Noise addition, microaggregation, global recoding, local suppression, sampling.',
      'PRAM, rank swapping, microaggregation, cell suppression, lossy compression.',
    ],
  },
  {
    id: '41', topic: 'other',
    q: String.raw`In a federated-learning-like setting you keep your data on your own device and ignore others' data. Why may local anonymization (e.g. k-anonymity or local DP) not be enough to guarantee your privacy?`,
    a: String.raw`Protecting data on each device doesn't necessarily protect the whole learning process.

- **k-anonymity:** a device with one record can't achieve k > 1; even with several local records, k-anonymity doesn't necessarily hold once information is combined across devices.
- **Gradient leakage:** raw data stays on the device, but the **shared gradients** can reveal sensitive information.
- **Model disclosure:** the global model may overfit/memorize, enabling **membership** or **attribute inference**.
- **Local DP:** limits disclosure, but the guarantee depends on ε and must account for **repeated releases**.

So additional global protection — e.g. **secure aggregation** and **DP for the final model** — may be necessary.`,
    correct: 'Local k-anonymity may be impossible (e.g. one record per device), shared gradients can leak data, the global model can memorize, and local DP degrades over repeated releases.',
    wrong: [
      'Local k-anonymity may be impossible (e.g. one record per device) and the global model can memorize, but gradients are safe since raw data never leaves the device.',
      'Local k-anonymity always holds if k is set per device, but shared gradients can leak data, the global model can memorize, and local DP degrades over repeated releases.',
      'Local k-anonymity may be impossible (e.g. one record per device), shared gradients can leak data, and the global model can memorize — but local DP holds regardless of releases.',
    ],
  },
  {
    id: '42', topic: 'other',
    q: String.raw`How can information loss for a data usage $f$ be defined?`,
    a: String.raw`Information loss measures how much the result of an analysis changes when using protected data instead of the original:

$$IL_f(X,X') = \operatorname{divergence}(f(X),f(X'))$$

- $X$: original dataset; $X'$: protected dataset; $f$: the analysis; divergence: the difference between results.

Larger divergence = more information loss. E.g. if $f$ is a classifier, compare its accuracy, precision and recall on original vs. protected data.`,
    correct: 'IL_f(X, X′) = divergence(f(X), f(X′)): how much the analysis result changes between original and protected data.',
    wrong: [
      'IL_f(X, X′) = divergence(X, X′): how much the protected records differ from the originals, whatever f is.',
      'IL_f(X, X′) = divergence(f(X), X′): how far the protected data is from the result of the analysis on the original.',
      'IL_f(X, X′) = risk(f(X′)) − risk(f(X)): how much disclosure risk the analysis adds on protected data.',
    ],
  },
  {
    id: '43', topic: 'other',
    q: String.raw`What is the difference between generic and specific information loss measures?`,
    a: String.raw`- **Generic:** used when the intended analysis is **unknown**. Measures how general statistical properties change after masking — MSE, mean, variance, correlation.
- **Specific:** used when the intended analysis is **known**. Measures how the results of that particular analysis change on protected vs. original data.

Specific measures let us **optimize** the masking for a particular use, potentially preserving its performance at the cost of utility for other analyses.`,
    correct: 'Generic: analysis unknown, compares general statistics (MSE, mean, variance, correlation). Specific: analysis known, compares that analysis\'s results, so masking can be tuned for it.',
    wrong: [
      'Generic: analysis known, compares general statistics (MSE, mean, variance, correlation). Specific: analysis unknown, compares a chosen analysis\'s results, so masking can be tuned for it.',
      'Generic: analysis unknown, compares general statistics (MSE, mean, variance, correlation). Specific: analysis known, compares that analysis\'s results, but masking cannot be tuned for it.',
      'Generic: measures disclosure risk against any attacker (MSE, mean, variance, correlation). Specific: measures disclosure risk against one known attacker model.',
    ],
  },
];

if (typeof module !== 'undefined') module.exports = { TOPICS, CARDS };
