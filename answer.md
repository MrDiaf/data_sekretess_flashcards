# 1. Discuss the transparency principle in data privacy in terms of risk and utility

**Transparency principle:**
- A protection method should remain effective even when an attacker knows how it has been implemented.
- Privacy should not depend on keeping the protection method secret.

It has two implications: **disclosure risk** and **data utility**.

**Disclosure risk:**
- An attacker who knows how the method works can develop countermeasures against it.
- Countermeasure: The protection method should be evaluated under the assumption that the attacker knows how it works.
- This does not guarantee a reduction in risk, but ensures that the protection does not rely on secrecy.

**Data utility:**
- Improved utility because researchers know how the data has been modified.
- Example: If random noise is added to the data, knowing its distribution can help researchers estimate statistical properties and quantify uncertainty.


# 2. Justify the importance of the transparency principle in terms of attacks and risk

Without the transparency principle, we may underestimate disclosure risk because we haven't considered attackers who know how the protection method works and can develop countermeasures against it.

# 3. Why are anonymity sets relevant for privacy? Do they protect against identity and attribute disclosure?

**Anonymity sets:**
- A group of individuals whose records cannot be distinguished from one another based on the information available to an attacker.
- The records do not need to be completely identical, only indistinguishable with respect to the identifying information.

**Identity disclosure:**
- Anonymity sets protect against identity disclosure because an attacker cannot directly determine which record belongs to a specific individual.
- However, additional **external information** may still allow identification if it can be linked to another column in the published dataset, allowing the attacker to distinguish records and potentially break the anonymity set.

**Attribute disclosure:**
- Anonymity sets do not necessarily protect against attribute disclosure.
- Example: Your buddy lives in Town A, and you know they participated in a published test. If all students in Town A received an F, you know your buddy received an F without knowing which record belongs to them.
- Therefore, sensitive attributes can be disclosed even when individual records cannot be identified.

# 4. Define identity disclosure for a database with information about people. Define attribute disclosure.

**Identity disclosure**
- Occurs when an attacker can identify which record in a database belongs to a particular individual.

**Attribute disclosure**
- An attacker gains **new** information about an individual.
- Does not require identifying the individual's record in the database.
- Can be as little as discovering that the individual is included in the database.
- If the attacker already knows all the attributes, identifying a record does not **necessarily** reveal new information about those attributes. However, discovering an individual's membership in the database may still constitute disclosure.

# 5. Why does applying univariate microaggregation to a database with several variables not necessarily produce a file that satisfies k-anonymity?

- **Univariate (one-variable) microaggregation** groups and masks each **variable independently**.
- Each variable may have at least **k identical values**, but their **combinations (intersections)** may still be unique.
- Therefore, the anonymity sets formed by combinations of **quasi-identifiers** may contain fewer than **k records**, violating **k-anonymity**.


# 6. How should variables be selected for microaggregation so that k-anonymity is satisfied?

**Univariate microaggregation**
- Each variable is microaggregated independently.
- An additional check is required to ensure that the combinations of **quasi-identifiers** still satisfy k-anonymity.
- If they do not, further modifications are required.

**Multivariate microaggregation**
- All quasi-identifiers are microaggregated together, using the same groups of at least **k records**.
- Because all quasi-identifiers are grouped together, their combinations cannot create smaller anonymity sets.
- Therefore, k-anonymity is **guaranteed** for the **selected** quasi-identifiers.

# What is a privacy model?

A **privacy model** defines the conditions that must be satisfied for data to be considered protected according to that model. Privacy conditions can be classified into two types:

**Boolean**
- A condition is either satisfied or not.
- Pass or fail.
- Example: k-anonymity.

**Quantitative**
- Disclosure risk is measured as a degree.
- How much risk exists?
- Example: Re-identification risk.

# 7. Relate k-anonymity, as a privacy model, to its parameter k and anonymity sets

- **K-anonymity** is a **Boolean privacy model**, meaning that a condition must be satisfied for the dataset to meet the privacy requirement.
- The parameter **k** defines the minimum number of records required in each anonymity set.
- **Anonymity sets** are formed based on **combinations** of the selected **quasi-identifiers**.
- For k-anonymity to be satisfied, the **smallest anonymity set** must contain at least **k records**.
- If any anonymity set contains fewer than **k records**, the dataset does not satisfy **k-anonymity**.


# 8. Give an example of disclosure from a file that satisfies k-anonymity. Give an example of a privacy model that provides better protection against such disclosure.

**Disclosure despite k-anonymity**
- Example: Everyone in Town A received an F on an exam.
- Even if **k is large**, knowing that your friend belongs to this anonymity set reveals that they received an F.
- This is **attribute disclosure**, despite satisfying k-anonymity.

**Solution: k-Anonymity with l-diversity**
- **l-diversity** requires each anonymity set to contain at least **l distinct sensitive attribute values** (for distinct l-diversity).
- Example: Town A only has students with grade F, while Town B only has students with grade E.
- We can generalize the town attribute by combining Town A and Town B into **"A or B"**.
- With **l = 2**, the anonymity set now contains two different grades: E and F.
- An attacker who only knows that their friend belongs to this anonymity set cannot determine their exact grade from the published records.
- This provides better protection against **attribute disclosure**, although it does not eliminate all disclosure risks.

# 9. What is the point of l-diversity if k-anonymity already protects against identity disclosure?

- **k-Anonymity** protects against **identity disclosure** by making records indistinguishable within anonymity sets.
- However, it does not necessarily protect against **attribute disclosure**.
- **l-Diversity** provides additional protection against **attribute disclosure** by requiring at least **l distinct sensitive attribute values** within each anonymity set (for distinct l-diversity).
- Therefore, even if an attacker knows which anonymity set an individual belongs to, they cannot necessarily determine the individual's sensitive attribute.

# 10.1 Define re-identification briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Identity disclosure.
- **Release:** Database release.
- **Definition:** A privacy model that limits the risk of an attacker linking records in a released database to specific individuals.
- An attacker may use known attribute values to match individuals to records.
- **Type:** **Quantitative**, where re-identification risk is measured and must remain below a specified threshold.

# 10.2 Define uniqueness briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Identity disclosure.
- **Release:** Database release (sample release).
- **Definition:** A privacy model that assesses uniqueness by measuring how many records that are unique in the sample are also unique in the population, divided by the total number of unique records in the sample.
- **Type:** **Quantitative**, where uniqueness risk is measured and must remain below a specified threshold.

**Uniqueness risk:**

$$

\frac{\text{Unique in both sample and population}}{\text{Unique in sample}}
$$

# 10.3 Define Result-driven briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Attribute disclosure.
- **Release:** Database release.
- **Definition:** Checks whether sensitive knowledge **K** can be derived using a data-mining algorithm **A** applied to database **X**, with parameters **Θ**.
- **Type:** **Boolean**, either the sensitive knowledge can be derived or it cannot.

$$
(A, X, \Theta) \nvdash K
$$

# 10.4 Define k-Anonymity briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Identity disclosure.
- **Release:** Database release.
- **Definition:** The smallest anonymity set formed by the **combinations of all selected quasi-identifiers** must contain at least **k records**.
- **Type:** **Boolean**, checks whether the smallest anonymity set contains at least **k records**.

# 10.5 Define k-confusion briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.
- **Focus:** Identity disclosure.
- **Release:** Database release.
- **Definition:** For every record in the database ther must be alteast **k possible mathing records** in the protected data, does **not** necessarliy need to be idnetical or simmliar. the thing that counts dpesn on the attackers's knowldedge and the protection method
- **Type:** **Boolean**, checks that the datbase records have atleast **k possible matchings**.

# 10.6 Define p-Sensitive k-Anonymity briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Identity and attribute disclosure.
- **Release:** Database release.
- **Definition:** An extension of **k-anonymity** that requires every anonymity set to contain at least **k records** and at least **p distinct values** for each sensitive attribute.
- **Type:** **Boolean**, checks whether both k-anonymity and p-sensitivity are satisfied.
- **Weakness:** Having p distinct values does not guarantee that they are equally likely. One sensitive value may still dominate the anonymity set.

# 10.7 Define k-Anonymity with l-Diversity briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Identity and attribute disclosure.
- **Release:** Database release.
- **Definition:** An extension of **k-anonymity** that requires every anonymity set to contain at least **k records**, with at least **l well-represented sensitive attribute values**.
- **Type:** **Boolean**, checks whether both k-anonymity and l-diversity are satisfied.
- **Difference:** Unlike p-sensitivity, stronger forms of l-diversity consider how well the sensitive values are represented, not just how many distinct values exist.
- **Example:** Entropy l-diversity considers the distribution of sensitive values, while distinct l-diversity only counts different values.

# 10.8 Define k-Anonymity with t-Closeness briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Identity and attribute disclosure.
- **Release:** Database release.
- **Definition:** An extension of **k-anonymity** that requires every anonymity set to contain at least **k records**, where the distribution of each **sensitive attribute** must be sufficiently close to its distribution in the entire database.
- **Benchmark:** The distance between the distributions must not exceed a threshold **t**.

$$
d(P_{\text{set}}, P_{\text{database}}) \leq t
$$

- **d:** Distance function, typically **Earth Mover's Distance (EMD)**.
- **t:** Maximum allowed distance between the distributions.
- **Type:** **Boolean**, checks whether both k-anonymity and t-closeness are satisfied.

# 10.9 Define Interval Disclosure briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Attribute disclosure.
- **Release:** Database release.
- **Definition:** A measure of disclosure risk that checks whether the **original sensitive attribute value** is within a specified interval of its **protected value**. If it is within that interval, the record is considered at risk of attribute disclosure.
- **Type:** **Quantitative**, because we can calculate the proportion of records whose original sensitive values fall within the specified intervals.

# 10.10 Define Differntial privacy briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Attribute disclosure.
- **Release:** Query release.
- **Definition:** A privacy model that limits how much the probability distribution of a query's output can change when one record is added to or removed from the database. This is commonly achieved by adding randomized noise to the query result.

  The privacy guarantee is defined as:

  $$
  P(K(D_1)\in S)\leq e^\varepsilon P(K(D_2)\in S)
  $$

  Where:
  - **$D_1, D_2$:** Two neighboring databases that differ by one record.
  - **$K$:** A randomized query mechanism.
  - **$S$:** Any possible set of query outputs.
  - **$\varepsilon$ (epsilon):** Controls how much the output probabilities may differ. Smaller epsilon means stronger privacy.

  The formula must hold for **every pair of neighboring databases and every possible output event**.

- **Type:** **Boolean**, because we check whether the mechanism satisfies the differential privacy guarantee for a given epsilon.


# 10.11 Define Local Differential Privacy briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Attribute disclosure.
- **Release:** Query release.
- **Definition:** An extension of **Differential Privacy** where each individual randomizes their sensitive data **locally, before sending it** to a central authority. This prevents the authority from directly observing the original values.

  Like ordinary differential privacy, it compares the probability of the **same output** under two different possible inputs, but instead of comparing two neighboring databases, we compare **two possible values from one individual**.

  $$
  P(R(x_1)\in S)\leq e^\varepsilon P(R(x_2)\in S)
  $$

  Where:
  - **$x_1,x_2$:** Two possible original values from an individual.
  - **$R$:** The local randomization mechanism.
  - **$S$:** Any possible output event.
  - **$\varepsilon$:** The privacy parameter controlling the maximum allowed probability ratio.

- **Example:** A company wants to analyze how much money its customers spend.

  Suppose Alice spends **10,000 kr** in a month. Instead of sending her actual spending amount, her device applies a locally differentially private randomization mechanism.

  The company receives a randomized value, making it harder to determine whether Alice spent **10,000 kr** or some other amount, such as **5,000 kr**.

  By collecting randomized values from many customers, the company can still estimate average spending without directly receiving each customer's true spending amount.

- **Type:** **Boolean**, because we check whether the local randomization mechanism satisfies the differential privacy guarantee for a specified epsilon.

# 10.12 Define Integral Privacy briefly, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

**Focus:** Attribute disclosure.

**Release:** Query release.

**Type:** Boolean.

**Definition:** Integral Privacy checks whether sufficiently many different databases can produce the exact same query result, without revealing that a particular person must be included in the original database.

The model requires at least $k$ possible databases consistent with the attacker's background knowledge, and no previously unknown individual may appear in all of them.

**Example:** A school publicly lists applicants for a private study, but does not disclose which applicants actually participated.

An attacker knows the applicants and their ages. By observing published query results, the attacker investigates which combinations of applicants could have produced those results.

If fewer than $k$ possible databases can produce the result, or a particular applicant must appear in every possible database, Integral Privacy is not satisfied.

# 10.13 Define Homomprohic encryption, mention whether it focuses on a database release or a query release, and whether it focuses on attribute disclosure or identity disclosure.

- **Focus:** Attribute disclosure.
- **Release:** Query release.
- **Type:** Boolean.

**Definition:** Homomorphic Encryption allows computations to be performed directly on encrypted data without decrypting it first.

The goal is to allow an untrusted party to perform computations without gaining access to the original data, intermediate computations, or decrypted result.

**Example:** A university wants a cloud server to calculate the average age of participants without revealing their ages.

The university encrypts the ages (30 and 70) and sends them to the cloud. Using Homomorphic Encryption, the cloud computes the encrypted sum without knowing the original values.

$$
D(E(30) \oplus E(70)) = 100
$$

Where:
- $E$: Encryption.
- $D$: Decryption.
- $\oplus$: Homomorphic addition on encrypted values.

The university decrypts the result and calculates the average as $100/2 = 50$.

The cloud never learns the individual ages or their sum.

**Important:** Homomorphic Encryption protects data during computation, but does not necessarily prevent disclosure through the final result if it is publicly released.


## 10.14 — Secure Multiparty Computation (SMC)

- **Focus:** Attribute disclosure.
- **Release:** Query release.
- **Type:** Boolean.

**Definition:** Secure Multiparty Computation allows multiple parties to jointly compute a function using their private databases without sharing the underlying data with each other.

It uses secure protocols to achieve the privacy guarantees of a trusted third party without requiring one. Each party should learn nothing beyond what can be inferred from its own data and the agreed computation result.

**Example:** Two universities want to calculate the average age of their students without sharing their individual databases. Using SMC, they can jointly calculate the average while keeping their private data confidential.

**Type:** Boolean, because the protocol either satisfies the specified privacy guarantees under the assumed adversary model or it does not.

**Important:** SMC does not prevent information from being inferred from the final result itself. It protects against learning additional information during the computation.

# 11. In what sense the privacy guarantees of k-confusion are the sameas the privacy guarantees of k-anonymity.

Both k-anonymity and k-confusion provide similar guarantees against identity disclosure by ensuring an anonymity set of at least k plausible records for each individual. The difference is that k-anonymity requires identical quasi-identifiers, while k-confusion allows different values as long as they remain plausible matches.

# 12. Why k-confusion provides a similar protection than k-anonymity if records can be different? How the definition of k-confusion links with the concept of anonymity se

k-Confusion provides similar protection to k-anonymity because both require an anonymity set containing at least $k$ plausible records.

However, unlike k-anonymity, k-confusion does not require the records to have identical quasi-identifiers or even similar values. It only requires that they remain plausible matches for the original record.

Therefore, the anonymity set is defined by the possible matches rather than by identical quasi-identifiers.

# 13. Discuss whether the following statement is always true or not, and its connection with k-confusion: ”Records need to be indistinguishable in order to build an anonymity set”. 

**False.** Records do not necessarily need to be indistinguishable to form an anonymity set.

In k-confusion, the records only need to be plausible matches for the original record, without requiring identical quasi-identifiers.

An attacker may use different re-identification methods and background knowledge. The anonymity set must still contain at least *k* plausible matches.

Therefore, k-confusion provides protection against identity disclosure through the size of the anonymity set rather than requiring identical records.

# 14. Explain what a membership inference attack is
A **Membership Inference Attack** attempts to determine whether a particular record was included in a model's training dataset by analyzing the model's behavior, often using shadow models to learn the differences between predictions on training and non-training examples.

And one final insight, choom: **Overfitting is often what makes these attacks possible**. A model that memorizes its training examples tends to reveal more information about which examples it has seen.

# 15. GANs are used to generate synthetic data. Does it make sense to apply membership inference attacks to GANs? Why?
Yes, it makes sense to apply membership inference attacks to GANs because synthetic data does not automatically guarantee privacy. A GAN may overfit or memorize information from its training dataset, causing generated samples or model behavior to reveal information about individual training records. An attacker could exploit this information to infer whether a particular record was used during training.

# Privacy for data: Masking methods 

# 16. Discuss whether the following statement is true or false: Any mask-ing method that includes some randomization is not vulnerable to transparency attacks.

**False**.** Adding randomization to a masking method does not automatically make it resistant to transparency attacks. If an attacker knows the masking algorithm and its parameters, they may exploit this knowledge together with external information to infer original values or re-identify individuals. The effectiveness of randomization depends on how the method is designed and how much information it reveals.

# 17. In microaggregation we require clusters to have at least k records, and it is usual that the maximum size is 2k. What is the role of having a maximum size?

The maximum cluster size is used to minimize unnecessary **information loss** and preserve **data utility**.

With excessively large clusters, dissimilar records may be grouped together, resulting in greater **data distortion**.

A cluster containing at least **2k records** can be divided into smaller clusters that still satisfy the minimum size requirement **k**, without increasing the squared-error information loss (SSE).

Therefore, it is sufficient to limit clusters to at most **2k − 1 records** when minimizing SSE, as larger clusters provide no necessary advantage.


# 18 Let us consider the application of PRAM to a categorical dataset with a transition matrix that has some zeros in non-diagonal positions. Can this matrix provide a meaningful differential privacy guarantee of the protected file?

**No**, because applying the differential privacy requirement to the transition matrix shows that it can be violated.

For example, consider these transition probabilities:

- Cat → Cat: 0.8
- Cat → Dog: 0.2
- Dog → Cat: 0
- Dog → Dog: 1

The differential privacy requirement is:

$$
P(M(D_1)=o)\leq e^\varepsilon P(M(D_2)=o)
$$

If the published output is Cat, we compare the probability that it originated from Cat versus Dog:

$$
0.8\leq e^\varepsilon\cdot 0
$$

$$
0.8\leq 0
$$

This is impossible for any finite $\varepsilon$, meaning the differential privacy requirement is violated.

Therefore, a transition matrix with such zero probabilities cannot provide a meaningful finite pure differential privacy guarantee.

# 19. What is PRAM and what is the connection between PRAM and differential privacy?
**PRAM (Post-Randomization Method)** is a masking method for categorical data. It uses a transition matrix containing probabilities that determine how each original category is randomly replaced by another category.

PRAM is related to **differential privacy** because its transition probabilities can be used to determine whether the mechanism satisfies local differential privacy.

For every pair of original categories $A$ and $B$, and every possible output $o$, the following must hold:

$$
P(M(A)=o)\leq e^\varepsilon P(M(B)=o)
$$

The same privacy parameter $\varepsilon$ must satisfy this inequality for all combinations.

The minimum possible $\varepsilon$ for the entire transition matrix is determined by the largest probability ratio between possible inputs for the same output.

If any output has positive probability for one input and zero probability for another, the mechanism cannot satisfy finite pure local differential privacy.

# 20. What condition needs the transition matrix in PRAM to provide meaningful differential privacy?

For PRAM to provide meaningful differential privacy, the transition probabilities must satisfy the differential privacy inequality:

$$
P(M(A)=o)\leq e^\varepsilon P(M(B)=o)
$$

This must hold for every pair of original categories and every possible output.

If a probability is zero for one original category but positive for another, the inequality cannot be satisfied for any finite $\varepsilon$.

Therefore, the transition matrix should have positive probabilities for all entries, with probability ratios bounded by a sufficiently small $e^\varepsilon$.

# 21. Why just synthetic data (using e.g. a type of GAN) is not enough? Why do we need, for example, differentially private synthetic data?

Synthetic data alone does not guarantee privacy because a generator, such as a GAN, can **overfit and memorize** records from its training dataset.

This can lead to generated records revealing sensitive information about individuals, resulting in **disclosure risks**, such as membership inference attacks.

Therefore, we need **differentially private synthetic data**, where differential privacy is applied to the generation process, for example by adding calibrated noise during training.

This limits the influence of individual training records and provides a mathematical privacy guarantee.q  q1

# 22. We need to apply a masking method to a database to produce a database with low disclosure risk. We consider different parameterizations for this method. For example, consider the case of applying microaggregation with different cluster sizes. How are we going to select the best parameterization?

To select the best parameterization, we first determine which **disclosure risks** we want to minimize and choose appropriate privacy requirements.

We then apply the masking method using different parameters, such as different cluster sizes $k$ in microaggregation.

For each parameterization, we evaluate both **disclosure risk** and **information loss (data utility)**.

We can then select the parameterization that satisfies our privacy requirements while minimizing information loss.

Alternatively, we can compare the **risk-utility trade-off**, for example using an R-U map, to choose the most suitable parameterization.

# 23. How heuristic methods for microaggregation work? Explain its re-lation with a privacy model.

Heuristic microaggregation uses a practical strategy, such as grouping nearby records, to form clusters containing at least $k$ records. For each cluster, a representative value is calculated, and the records' values are replaced by that representative.

This relates to $k$-anonymity because, when all quasi-identifiers are aggregated together, each released combination is shared by at least $k$ records, making individuals harder to distinguish using those attributes.

# Privacy for computations: Differential privacy mechanisms

# 24. You and me want to know in our wedding whether your guests or my guests have larger income. We ask them to provide us with their salary using local differential privacy. All guests send us their salary with a noise following the distribution L(0,∆s/ε), with appropriate sensitivity and ε. Then we add the values from your guests,and the values from my guests, and compare them.Discuss: Does this allows us to know if the average salary of your guests is larger than the average salary of my guests?

We can estimate which group has the higher average salary by comparing their noisy means. By combining their standard deviations, we can measure the uncertainty of their difference. The further this difference is from zero in standard-deviation units, the more confident we can be about which average is larger. However, we cannot guarantee the correct result. 

# 25. We are a group of thieves, and a painting has just been stolen from an important museum. We want to know if any of us was involved, but without revealing who it was. Can a Secure Multiparty Computation protocol help us find out if one of us was responsible, without anyone learning who it was? Discuss the answer. (Assume there are at least three of us.)

Yes, Secure Multiparty Computation can help us determine whether someone was involved without revealing their identity.

We can use the **Dining Cryptographers protocol**:

1. Each participant flips a coin and secretly shares its result with their neighbor.
2. Each participant compares the two coin results they know using XOR.
3. If a participant was involved in the theft, they invert their announced result.
4. Everyone publicly announces their result, and we calculate the XOR of all announcements.

Because each shared coin appears twice in the final XOR, the random coin values cancel out.

The final result is **1 if an odd number of participants were involved**, and **0 if an even number were involved**.

Therefore, assuming at most one person was involved, we can determine whether someone participated without learning who.

However, if multiple people were involved, XOR alone is insufficient. We would need a secure OR computation to determine whether at least one participant was involved. Privacy also depends on the participants following the protocol and the assumptions about collusion.

# 26. Let D represent a data set. Then, let us consider the application of a machine learning algorithm to D to obtain a machine learning model M. Explain why M can lead to disclosure, and give an example.

A machine learning model can lead to disclosure because it may overfit and memorize information from its training dataset.

For example, a generative model trained on records containing age, gender, profession, and income could generate a record very similar to a real individual's record.

If an attacker can link that generated record to a known individual using external information, they may infer sensitive information, such as the individual's income.

Disclosure can also occur through membership inference attacks, where an attacker tries to determine whether a specific record was used during training.

# 27. In differential privacy, why multiple queries on the same dataset increase the disclosure. Is this quantifiable in terms of the epsilon value?
Multiple queries can increase disclosure because their answers can be combined to learn more about the underlying data. For example, averaging repeated answers with fresh independent noise can reduce the noise and reveal a more accurate estimate of the true value.

This is quantified through sequential composition: queries with privacy parameters $\varepsilon_1,\ldots,\varepsilon_k$ together satisfy $(\sum_i\varepsilon_i)$-differential privacy. A larger total epsilon means a weaker privacy guarantee. We can limit this by choosing a total privacy budget and ensuring the sum of the queries’ epsilon costs stays within it.

```
28. Let us consider the application of differential privacy to the fol-
lowing functions, we assume that the values to be combined are in the interval
[0,1]
– (a) minimum of an arbitrary number of arguments.
– (b) maximum of an arbitrary number of arguments.
– (c) median of an arbitrary number of arguments. Recall that for an odd
number of arguments, the median is the value that occupies the central
position after sorting all arguments. For an even number of arguments, the
median is the average of the two values in central positions.
Questions
– Compute the sensitivity of these functions. Compute the Laplace scale pa-
rameter b when we require ε = 1 and ε = 2.
– What will provide a more accurate output?
– Compare the result with the one of the mean.

```

Assuming neighboring datasets differ by replacing one input value, sensitivity is the largest possible change in the function’s output.

Since all inputs lie in [0,1], the minimum, maximum and median have a worst-case sensitivity of 1 across arbitrary input counts.

The Laplace scale parameter is:

$$
b = \frac{\Delta s}{\varepsilon}
$$

| Function | Sensitivity | b for ε = 1 | b for ε = 2 |
|---|---:|---:|---:|
| Minimum | 1 | 1 | 1/2 |
| Maximum | 1 | 1 | 1/2 |
| Median, worst case over input counts | 1 | 1 | 1/2 |
| Mean of n inputs | 1/n | 1/n | 1/(2n) |

Using ε = 2 provides more accurate outputs because the noise scale is smaller. However, it provides weaker privacy.

For the mean, replacing one input changes the sum by at most 1. Dividing by n gives a sensitivity of 1/n. Therefore, the mean requires less noise as n increases.

For a fixed odd number of inputs, median sensitivity is 1. For a fixed even number, it is 1/2. Thus, its worst-case sensitivity across arbitrary input counts is 1.


```

29. Let us consider that we want to compute the function f from a
database X. Let this function be the mean of a variable. So, we know that the
sensitivity of f is (max −min)/S where S is the minimal number of records in
S.
Let us consider that we first microaggregate X with at least k records in each
cluster

Can we say something about the sensitivity of the function f? Is it larger or
smaller?
```

Microaggregation is defined as building clusters and replacing records by a representative, typically the cluster mean. The differential privacy chapter defines the sensitivity of the mean as

$$
\Delta(\text{mean}) = \frac{\max-\min}{S},
$$

where $[\min,\max]$ is the attribute range and $S$ is the minimum number of records assumed in the database.

Although microaggregation may reduce the observed minimum and maximum of the released data, this does not necessarily reduce the sensitivity used in differential privacy. Under standard microaggregation, if each record is replaced by its cluster mean and we then compute the mean over the whole microaggregated dataset, the overall mean is preserved:

$$
f(A(X)) = f(X).
$$

Hence, for neighboring datasets $X$ and $X'$,

$$
|f(A(X)) - f(A(X'))| = |f(X) - f(X')|.
$$

Therefore, under this interpretation, the sensitivity of the mean remains unchanged.

So: the book supports the ingredients of this reasoning, but it does not explicitly state this final conclusion word-for-word.

```
30. Let us consider ε-differential privacy implemented using the Lapla-
cian mechanism. Describe the general effect of sensitivity of a query on the
amount of noise you would add, assuming a fix ε.
```
For fixed $\epsilon$, the amount of Laplace noise increases linearly with the sensitivity of the query.

This is because the Laplace scale parameter is

$$
b = \frac{S}{\epsilon},
$$

where $S$ is the sensitivity.

So, if sensitivity increases, more noise must be added. If sensitivity decreases, less noise is needed.

```
 31. Let us consider two functions, one that provides a differentially pri-
vate mean and another that provides a differentially private standard deviation.
Then, let us consider a data set. If we apply both functions, each with a privacy
budget ε to this set, what can we say about the disclosure?
```

When applying two differentially private functions to the same dataset, their privacy losses are additive due to sequential composition.

Since both the mean and standard deviation have a privacy budget of $\epsilon$, the combined release satisfies:

$$
\epsilon_{\text{total}} = \epsilon + \epsilon = 2\epsilon
$$

Therefore, the combined privacy guarantee is $2\epsilon$-differential privacy, allowing greater potential disclosure than either release alone.

```
32. A data scientist wants to apply differential privacy to a data set.
First, the data scientist queries the data set to have the maximum and the mini-
mum of the data set. Then, these two values are used to compute the sensitivity.
Finally, the data scientist applies local differential privacy using this sensitivity
and the desired ε value. What is wrong with this method from a data privacy
perspective?
```

The main problem is that the data scientist calculates sensitivity using the actual maximum and minimum of the private dataset rather than predefined bounds.

This is problematic because the extrema themselves contain sensitive information. Furthermore, using them to determine the noise scale can reveal information about the dataset and does not necessarily provide a valid differential privacy guarantee.

Additionally, local differential privacy is normally applied before data is sent to an untrusted collector. If the data scientist already has access to the raw dataset, local DP cannot protect that data from the scientist.

Therefore, sensitivity should be calculated using publicly known or predefined bounds, and the choice between local and central differential privacy should depend on who is trusted with the raw data.


```
33. Let us consider data in [0,1000] and with a database with at least
100 records. Consider the following two functions mean and maximum applied
to this database, in the context of differential privacy assuming a preselected ε.
Which of these functions requires more noise, why? Discuss the noise in
relation to function sensitivity.

```


The sensitivity of the mean is:

$$
\Delta f_{\text{mean}} = \frac{1000-0}{100}=10
$$

The sensitivity of the maximum is:

$$
\Delta f_{\max}=1000-0=1000
$$

The mean has lower sensitivity because changing one record affects the overall mean proportionally to the number of records.

However, the maximum has higher sensitivity because changing a single record can change the maximum by the entire allowed range.

Since the Laplace noise scale is linearly proportional to sensitivity for a fixed $\epsilon$:

$$
b=\frac{\Delta f}{\epsilon}
$$

The maximum requires 100 times larger noise scale than the mean.

Therefore, the maximum is more sensitive and requires more noise to satisfy the same differential privacy guarantee.



# Other privacy mechanisms

```
34. We can consider Secure Multiparty Computation (SMC) and dif-
ferential privacy (DP) as two different privacy models. Why should we consider
them together in a single framework? Give an example
```

SMC and DP should be combined because they protect different aspects of data privacy.

SMC allows multiple parties to compute a function without revealing their private inputs to each other. However, the final result can still disclose sensitive information.

DP complements SMC by limiting how much information about an individual can be inferred from the released result.

**Example:**

Suppose multiple hotels want to determine how many wealthy individuals visited a town.

SMC allows the hotels to compute the total without sharing their individual guest records.

However, if the result reveals that exactly one wealthy person visited, someone with additional knowledge might infer who it was.

By applying DP to the final count, we can reduce this disclosure risk by adding noise.

Therefore, combining SMC and DP protects both the computation process and the released result.

```
 35. Why the problem of dining cryptographers (or, equivalently, com-
putation of exclusive or using secure multiparty computation) can be seen as
related to unobservability?

```


The Dining Cryptographers protocol is related to unobservability because it provides anonymity and aspects of undetectability.

**Anonymity:** Participants can determine whether someone at the table paid without revealing the identity of the payer.

**Undetectability:** Every participant communicates a bit regardless of whether they paid. Therefore, observing an individual's communication does not reveal whether that individual paid.

However, the final XOR result reveals whether an odd number of participants paid, meaning the collective event is not completely undetectable.

Thus, the protocol is related to unobservability because it hides individual participation, even though it reveals the collective result.

**TL;DR:**

It depends on what activity we are trying to hide:

- **Did someone at the table pay?** Not undetectable, since the final XOR reveals this (assuming at most one participant paid).
- **Did a specific individual pay?** Their involvement is hidden, since we cannot determine who paid. This is primarily anonymity.

Therefore, Dining Cryptographers provides anonymity of the payer but not complete undetectability of the collective payment.

```
36 What is a semi-honest adversary?
```
A semi-honest adversary follows the protocol correctly but attempts to infer as much private information as possible from the information available to them during its execution.

They analyze their own inputs, received messages, and outputs without deviating from the protocol.

```
37. What is a malicious adversary? and why malicious adversaries can
get some information from a secure multiparty computation protocol if all the
information is encrypted?
```


A malicious adversary is a participant who deliberately deviates from the protocol to gain confidential information.

They may provide false inputs, manipulate intermediate computations, or collaborate with other participants.

Even if the exchanged information is encrypted, encryption alone does not guarantee privacy. An adversary may manipulate the protocol or combine information they legitimately receive to infer private data.

Therefore, SMC protocols must be designed to protect against malicious behavior, not just unauthorized access to encrypted information.

```
 38. What is the difference between a semi-honest adversary and a ma-
licious adversary in secure multiparty computation?
```



**Semi-honest adversary:** Follows the protocol correctly but attempts to infer as much private information as possible from the information available during execution.

**Malicious adversary:** May deliberately deviate from the protocol by providing false inputs, manipulating messages, or performing unauthorized actions to gain confidential information.

The main difference is that semi-honest adversaries follow the protocol, while malicious adversaries may break its rules.


```
39. Why in tabular data protection, we need secondary suppressions?
Why the suppression of sensitive values is not enough?
```


Secondary suppression is needed because hiding a sensitive value alone may not prevent disclosure.

If the table contains public totals and other visible values, an attacker may calculate the suppressed value by subtraction.

Therefore, secondary suppression hides additional values to prevent the reconstruction of sensitive information.

```
40. Perturbative methods appear repeatedly in data protection, for
different types of data. List some of them.
```


Examples of perturbative data protection methods include:

- PRAM (Post-Randomization Method)
- Noise addition
- Rank swapping
- Microaggregation
- Lossy compression

These methods modify or distort the original data to reduce disclosure risk.


```
41. Consider a distributed scenario as in federated learning where you
have your own data in your own device and you fully ignore the data of others.
Discuss why local anonymization (e.g. k-anonymity or local differential privacy)
may not be enough for guaranteeing your privacy.
```

### Exercise 41

Local anonymization may not be sufficient in federated learning because protecting data on individual devices does not necessarily protect the entire learning process.

**k-Anonymity:** If a device contains only one record, k-anonymity cannot be achieved for k > 1. Even with multiple local records, k-anonymity does not necessarily protect the individual when information is combined with other devices.

**Gradient leakage:** Although raw data remains on the device, the gradients shared during training can reveal sensitive information about the original data.

**Model disclosure:** The global model may overfit or memorize training data, allowing membership inference or attribute inference attacks.

**Local differential privacy:** Local DP limits disclosure, but the privacy guarantee depends on the chosen epsilon and must account for repeated releases.

Therefore, local protection alone may not be enough. Additional global protection mechanisms, such as secure aggregation and differential privacy for the final model, may be necessary.

```
 42. How information loss for a data usage f can be defined?
```

### Exercise 42

Information loss measures how much the result of a data analysis changes when using protected data instead of the original data.

It can be defined as:

$$
IL_f(X,X') = \operatorname{divergence}(f(X),f(X'))
$$

Where:
- $X$ is the original dataset.
- $X'$ is the protected dataset.
- $f$ is the data analysis performed.
- $\operatorname{divergence}$ measures the difference between the results.

The larger the divergence, the greater the information loss.

For example, if $f$ is a classification model, we can compare its performance on original and protected data using accuracy, precision, and recall.

```
43. What is the difference between generic and specific information loss
measures?
```


**Generic information loss:** Used when the intended analysis of the data is unknown. It measures how much general statistical properties change after masking, using measures such as MSE, mean, variance, and correlation.

**Specific information loss:** Used when the intended analysis is known. It measures how much the results of that particular analysis change when using protected data instead of original data.

Specific information loss allows us to optimize the masking method for a particular use, potentially preserving its performance while sacrificing utility for other analyses.